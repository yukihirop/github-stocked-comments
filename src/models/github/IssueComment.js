'use strict'

import BaseModel from './BaseModel'
import RepoLanguage from './RepoLanguage'
import Storage from '@/ext/Storage'

export default class IssueComment extends BaseModel {
  constructor () {
    super()
    this.repo_language = new RepoLanguage()
    // override
    this.type = 'issuecomment'
    this.storage = new Storage(this.name)
  }

  fields(){
    return {
      id: this.id,
      user_id: this.user_id,
      type: this.type,
      repoUserName: this.repoUserName,
      repoName: this.repoName,
      issueTitle: this.issueTitle,
      stockedAt: this.stockedAt,
      repo_language_id: this.repo_language_id,
      body: this.body,
      postUserName: this.postUserName,
      postUserAvatarURL: this.postUserAvatarURL,
      postUserUserURL: this.postUserUserURL,
      postOriginURL: this.postOriginURL,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  // private
  createId(params){
    return `${this.user_id}-${params.repoUserName}-${params.repoName}-${params.issueId}-${params.type}-${params.commentId}`
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

  updateProperties(params, update_params = {}){
    if (Object.keys(update_params).length === 0) {
      this.id = this.createId(params)
    } else {
      Object.keys(update_params).forEach(key => {
        let value = update_params[key]
        switch(key){
          case 'user_id':
            this.user_id = value
            this.id = this.createId(params)
            break
          default:
            this.id = this.createId(params)

            break
        }
      })
    }
  }

  buildSaveData(params){
    let result = {}
    this.appendForeignKeys()
    this.data.id = this.id
    this.data.type = this.type
    this.data.repoUserName = params.repoUserName
    this.data.repoName = params.repoName
    this.data.issueTitle = params.issueTitle
    this.data.stockedAt = params.stockedAt
    result[this.id] = this.data
    return result
  }

  /******************/
  /*** Fetch Func ***/
  /******************/
  fetchData(){
    this.storage.where({ user_id: this.user_id })
    return this.storage.fetchData()
  }

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
    this.issueTitle = data.issueTitle
    this.stockedAt = data.stockedAt
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
    this.postOriginURL = postUserComment.html_url
    this.body = postUserComment.body
    this.createdAt = postUserComment.createdAt
    this.updatedAt = postUserComment.updatedAt
  }

  /*******************/
  /*** Delete Func ***/
  /*******************/
  deleteData(id){
    return this.storage.deleteData(id)
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
    this.html_url = data.html_url
  }
}
