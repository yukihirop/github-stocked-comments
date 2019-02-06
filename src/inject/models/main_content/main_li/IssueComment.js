'use strict'

import Base from './Base'

export default class IssueComment extends Base {
  setProperties () {
    this.postUserComment = new PostUserComment(this.data)
    let postUserComment = this.postUserComment

    this.postUserName = postUserComment.userName
    this.postUserAvatarURL = postUserComment.avatarURL
    this.postUserUserURL = postUserComment.userURL
    this.body = postUserComment.body
    this.createdAt = postUserComment.createdAt
    this.updatedAt = postUserComment.updatedAt
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
