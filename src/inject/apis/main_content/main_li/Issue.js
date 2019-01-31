'use strict'

import Octokit from '@octokit/rest'

export default class Issue {
  constructor (issueMeta) {
    this.repoUserName = issueMeta.repoUserName
    this.repoName = issueMeta.repoName
    this.issueId = issueMeta.issueId
    this.type = issueMeta.type
    this.commentId = issueMeta.commentId
    this.copyLinkURL = issueMeta.copyLinkURL
    this.apiURL = issueMeta.apiURL
    this.octokit = new Octokit()
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  fetchData (callback) {
    this.octokit.issues.get({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      number: `${Number(this.issueId)}`
    })
      .then((issueData) => {
        this.postUserIssue = new PostUserIssue(issueData)
        let postUserIssue = this.postUserIssue

        this.postUserName = postUserIssue.userName
        this.postUserAvatarURL = postUserIssue.avatarURL
        this.postUserUserURL = postUserIssue.userURL
        this.body = postUserIssue.body
        this.createdAt = postUserIssue.createdAt
        this.updatedAt = postUserIssue.updatedAt

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
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
