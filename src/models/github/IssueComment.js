'use strict'

import BaseModel from './BaseModel'
import RepoLanguage from './RepoLanguage'

export default class IssueComment extends BaseModel {
  constructor () {
    super()
    this.repo_language = new RepoLanguage()
    // override
    this.type = 'issuecomment'
  }

  get relationships(){
    return [this.repo_language]
  }

  fields(){
    return {
      id: this.id,
      user_id: this.user_id,
      type: this.type,
      repoUserName: this.repoUserName,
      repoName: this.repoName,
      repo_language_id: this.repo_language_id,
      body: this.body,
      postUserName: this.postUserName,
      postUserAvatarURL: this.postUserAvatarURL,
      postUserUserURL: this.postUserUserURL,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  // private
  createId(params){
    return `${params.repoUserName}-${params.repoName}-${params.issueId}-${params.type}-${params.commentId}`
  }

  dataFromOctokit (params) {
    return this.authClient.issues.getComment({
      owner: `${params.repoUserName}`,
      repo: `${params.repoName}`,
      comment_id: `${Number(params.commentId)}`
    }).then(result => {
      this.data = result
      this.updateProperties(params)
    }).catch(error => {
      console.log(error)
    })
  }

  /******************/
  /*** Fetch Func ***/
  /******************/

  // private
  setProperties (id, data) {
    this.id = id
    this.data = data
    this.setSelfProperties(id, data)
    this.setPostUserCommentProperties(id, data)
  }

  setSelfProperties(id, data) {
    this.repoUserName = data.repoUserName
    this.repoName = data.repoName
    // foreign key
    this.repo_language_id = data.repo_language_id
    this.user_id = data.user_id
  }

  // private
  setPostUserCommentProperties(id, data){
    let postUserComment = new PostUserComment(data)

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
    this.data = commentData.data

    this.setProperties()
  }

  setProperties(){
    let data = this.data

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
