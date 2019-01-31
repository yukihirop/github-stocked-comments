'use strict'

import storage from '@/ext/storage'

export default class IssueComment {
  constructor () {
    this.$actionList = $('div.timeline-comment-actions')
  }

  attachStockedCommentsButton () {
    this.createStockedCommentsButton()

    this.onClick()
    this.$actionList.append(this.$stockedCommentsButton)
  }

  // private
  createStockedCommentsButton () {
    this.$stockedCommentsButton = $('<button>', {
      class: 'details-overlay details-reset position-relative d-inline-block',
      text: 'Stocked Comments'
    })
    return this
  }

  // private
  /* eslint-disable no-unused-vars, one-var, no-redeclare */
  onClick () {
    this.$stockedCommentsButton.on('click', (event) => {
      let $this = $(event.currentTarget)

      let commentData = new IssueCommentData($this)
      var saveData = commentData.createStorageData()

      storage.saveCommentMetaData(saveData).then((data) => {
        console.log(data)
      })
    })
  }
}

// private class
/*
 * Construct meta information of issue comments.
 *
 */
class IssueCommentData {
  constructor (el) {
    this.userRepoName = $('a[data-pjax="#js-repo-pjax-container"]').attr('href')
    this.issueHashNum = $('span.gh-header-number').text()
    this.commentAreaHashId = el.parents('div.timeline-comment-group.js-minimizable-comment-group.js-targetable-comment').attr('id')
  }

  createStorageData () {
    let uniqueKey = this.createChromeStorageUniqueKey(...this.params())
    var [copyLinkURLType, copyLinkURL] = this.createCommentCopyLinkURL(...this.params())
    var [apiURLType, apiURL] = this.createCommentAPIURL(...this.params())
    var [repoUserName, repoName, issueId, type, commentId] = this.params()

    return {
      [uniqueKey]: {
        repoUserName: `${repoUserName}`,
        repoName: `${repoName}`,
        issueId: `${issueId}`,
        type: `${type}`,
        commentId: `${commentId}`,
        copyLinkURL: `${copyLinkURL}`,
        apiURL: `${apiURL}`,
        reactions: [],
        tags: [],
        memo: ''
      }
    }
  }

  params () {
    var [_, repoUserName, repoName] = this.userRepoName.split('/')
    var [_, _, issueId] = this.issueHashNum.split('#')

    // type is 「#issue」 or 「#issuecomment」.
    // if type is issue, commentId is useless.
    var [type, commentId] = this.commentAreaHashId.split('-')

    return [repoUserName, repoName, issueId, type, commentId]
  }

  createChromeStorageUniqueKey (repoUserName, repoName, issueId, type, commentId) {
    return `${repoUserName}-${repoName}-${issueId}-${type}-${commentId}`
  }

  createCommentCopyLinkURL (repoUserName, repoName, issueId, type, commentId) {
    const baseURL = 'https://github.com'
    let copyLink = `${baseURL}/${repoUserName}/${repoName}/issues/${issueId}#${type}-${commentId}`
    return [type, copyLink]
  }

  createCommentAPIURL (repoUserName, repoName, issueId, type, commentId) {
    let apiURL
    const baseURL = 'https://api.github.com/repos'
    if (type === 'issuecomment') {
      apiURL = `${baseURL}/${repoUserName}/${repoName}/issues/comments/${commentId}`
    } else if (type === 'issue') {
      apiURL = `${baseURL}/${repoUserName}/${repoName}/issues/${issueId}`
    }
    return [type, apiURL]
  }
}
