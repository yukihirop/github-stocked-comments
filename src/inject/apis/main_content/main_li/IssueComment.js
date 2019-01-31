'use strict'

import Octokit from '@octokit/rest'

export default class IssueComment {
  constructor (commentMeta) {
    this.repoUserName = commentMeta.repoUserName
    this.repoName = commentMeta.repoName
    this.issueId = commentMeta.issueId
    this.type = commentMeta.type
    this.commentId = commentMeta.commentId
    this.copyLinkURL = commentMeta.copyLinkURL
    this.apiURL = commentMeta.apiURL
    this.octokit = new Octokit()
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  fetchData (callback) {
    this.octokit.issues.getComment({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      comment_id: `${Number(this.commentId)}`
    })
      .then((commentData) => {
        this.postUserComment = new PostUserComment(commentData)
        let postUserComment = this.postUserComment

        this.postUserName = postUserComment.userName
        this.postUserAvatarURL = postUserComment.avatarURL
        this.postUserUserURL = postUserComment.userURL
        this.body = postUserComment.body
        this.createdAt = postUserComment.createdAt
        this.updatedAt = postUserComment.updatedAt

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }
}

// private class
class PostUserComment {
  constructor (commentData) {
    let data = commentData.data
    this.userName = data.user.login
    this.avatarURL = data.user.avatar_url
    this.gravatarId = data.user.gravatar_id
    this.userURL = data.user.url
    this.siteAdmin = data.user.site_admin
    this.body = data.body
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
  }
}
