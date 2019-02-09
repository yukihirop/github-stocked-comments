'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class IssueComment extends Base {
  constructor(id, data){
    super(id, data)
    this.type = data.type
    this.repoUserName = data.repoUserName
    this.repoName = data.repoName
    // foreign key
    this.repo_language_id = this.data.repo_language_id

    this.setProperties()
  }

  // private
  setProperties () {
    this.setPostUserCommentProperties()
    this.setRepoLanguageProperties()
  }

  // private
  setPostUserCommentProperties(){
    let postUserComment = new PostUserComment(this.data)

    this.postUserName = postUserComment.userName
    this.postUserAvatarURL = postUserComment.avatarURL
    this.postUserUserURL = postUserComment.userURL
    this.body = postUserComment.body
    this.createdAt = postUserComment.createdAt
    this.updatedAt = postUserComment.updatedAt
  }

  // private
  setRepoLanguageProperties(){
    let repoLanguage = new RepoLanguage(this.repo_language_id, this.data.relationships.repo_language.data)

    this.mainLanguage = repoLanguage.mainLanguage
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
