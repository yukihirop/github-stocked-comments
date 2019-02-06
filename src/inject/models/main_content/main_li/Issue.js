'use strict'

import Base from './Base'

export default class Issue extends Base {
  setProperties () {
    this.postUserIssue = new PostUserIssue(this.data)
    let postUserIssue = this.postUserIssue

    this.postUserName = postUserIssue.userName
    this.postUserAvatarURL = postUserIssue.avatarURL
    this.postUserUserURL = postUserIssue.userURL
    this.body = postUserIssue.body
    this.createdAt = postUserIssue.createdAt
    this.updatedAt = postUserIssue.updatedAt
  }
}

// private class
class PostUserIssue {
  constructor (issueData) {
    let data = issueData.data
    this.userName = data.user.login
    this.avatarURL = data.user.avatar_url
    this.gravatarId = data.user.gravatar_id
    this.userURL = data.user.url
    this.siteAdmin = data.user.site_admin
    this.title = data.title
    this.body = data.body
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
  }
}
