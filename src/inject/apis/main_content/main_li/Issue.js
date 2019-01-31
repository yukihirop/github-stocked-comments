'use strict'

import Base from '@/inject/apis/main_content/main_li/Base'
import storage from '@/ext/storage'

export default class Issue extends Base {
  // private
  fetchDataFromGitHub (callback) {
    this.octokit.issues.get({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      number: `${Number(this.issueId)}`
    })
      .then((issueData) => {
        this.setProperties(issueData, () => {
          storage.updateCommentData(this.id, this.data())
        })

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  // private
  setProperties (issueData, callback = () => {}) {
    this.postUserIssue = new PostUserIssue(issueData)
    let postUserIssue = this.postUserIssue

    this.postUserName = postUserIssue.userName
    this.postUserAvatarURL = postUserIssue.avatarURL
    this.postUserUserURL = postUserIssue.userURL
    this.body = postUserIssue.body
    this.createdAt = postUserIssue.createdAt
    this.updatedAt = postUserIssue.updatedAt

    callback()
  }

  // private
  data () {
    let error = new Error('postUserIssue should not be null')
    if (!this.postUserIssue) throw error
    return {
      repoUserName: `${this.repoUserName}`,
      repoName: `${this.repoName}`,
      issueId: `${this.issueId}`,
      type: `${this.type}`,
      commentId: `${this.commentId}`,
      copyLinkURL: `${this.copyLinkURL}`,
      apiURL: `${this.apiURL}`,
      reactions: [],
      tags: [],
      memo: '',
      cache: true,
      data: {
        title: `${this.postUserIssue.title}`,
        body: `${this.postUserIssue.body}`,
        created_at: `${this.postUserIssue.createdAt}`,
        updated_at: `${this.postUserIssue.updatedAt}`,
        user: {
          login: `${this.postUserIssue.userName}`,
          avatar_url: `${this.postUserIssue.avatarURL}`,
          gravatar_id: `${this.postUserIssue.gravatarId}`,
          url: `${this.postUserIssue.userURL}`,
          site_admin: `${this.postUserIssue.siteAdmin}`
        }
      }
    }
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
