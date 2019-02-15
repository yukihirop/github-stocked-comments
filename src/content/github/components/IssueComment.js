'use strict'

import StockedComment from '@/apis/github/StockedComment'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

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
    let $stockedCommentsButtonContent = $('<span>', {
      class: "btn btn-sm btn-primary float-right timeline-comment-label",
      text: "Stocked"
    })

    this.$stockedCommentsButton = $(`
    <div
      class="timeline-comment-actions"
      container="body"
      title=""
      data-placement="top"
      data-content="Stocked Complete!"
    />`)

    this.$stockedCommentsButton.append($stockedCommentsButtonContent)

    return this
  }

  // private
  /* eslint-disable no-unused-vars, one-var, no-redeclare */
  onClick () {
    this.$stockedCommentsButton.on('click', (event) => {
      let $this = $(event.currentTarget)

      let commentData = new IssueCommentData($this)
      var params = commentData.params()

      let api = new StockedComment(null, params)
      api.saveData((error, isSave) => {
        if (error) throw error
        if (isSave) {
          console.log('Save data success')
          // https://stackoverflow.com/questions/37452086/what-is-the-best-way-to-load-bootstrap-with-an-es6-import
          $this.popover('show');
          new Promise((resolve) => { setTimeout(() => { $this.popover('hide') }, 1000) })
        }
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
    this.issueTitle = $('span.js-issue-title').text()
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
      issueTitle: `${this.issueTitle}`,
      type: `${type}`,
      commentId: `${commentId}`,
      stockedAt: new Date()
    }
  }
}
