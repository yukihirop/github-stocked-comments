'use strict'

import StockedComment from '@/apis/github/StockedComment'

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
      var params = commentData.params()

      let api = new StockedComment()
      api.saveData(params, (error, isSave) => {
        if (error) throw error
        if (isSave) console.log('Save data success')
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

  params () {
    var [_, repoUserName, repoName] = this.userRepoName.split('/')
    var [_, _, issueId] = this.issueHashNum.split('#')

    // type is 「#issue」 or 「#issuecomment」.
    // if type is issue, commentId is useless.
    var [type, commentId] = this.commentAreaHashId.split('-')

    return {
      repoUserName: `${repoUserName}`,
      repoName: `${repoName}`,
      issueId: `${issueId}`,
      type: `${type}`,
      commentId: `${commentId}`
    }
  }
}
