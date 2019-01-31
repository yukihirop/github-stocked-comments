'use strict'

import Base from '@/inject/apis/main_content/main_li/Base'
import storage from '@/ext/storage'

export default class IssueComment extends Base {
  // private
  fetchDataFromGitHub (callback) {
    this.octokit.issues.getComment({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      comment_id: `${Number(this.commentId)}`
    })
      .then((commentData) => {
        this.setProperties(commentData, () => {
          storage.updateCommentData(this.id, this.data())
        })

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  // private
  setProperties (commentData, callback = () => {}) {
    this.postUserComment = new PostUserComment(commentData)
    let postUserComment = this.postUserComment

    this.postUserName = postUserComment.userName
    this.postUserAvatarURL = postUserComment.avatarURL
    this.postUserUserURL = postUserComment.userURL
    this.body = postUserComment.body
    this.createdAt = postUserComment.createdAt
    this.updatedAt = postUserComment.updatedAt

    callback()
  }

  data () {
    let error = new Error('postUserComment should not be null')
    if (!this.postUserComment) throw error
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
        title: `${this.postUserComment.title}`,
        body: `${this.postUserComment.body}`,
        created_at: `${this.postUserComment.createdAt}`,
        updated_at: `${this.postUserComment.updatedAt}`,
        user: {
          login: `${this.postUserComment.userName}`,
          avatar_url: `${this.postUserComment.avatarURL}`,
          gravatar_id: `${this.postUserComment.gravatarId}`,
          url: `${this.postUserComment.userURL}`,
          site_admin: `${this.postUserComment.siteAdmin}`
        }
      }
    }
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
