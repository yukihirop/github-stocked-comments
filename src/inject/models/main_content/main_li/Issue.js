'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class Issue extends Base {
  constructor(id, data){
    super(id, data)
    this.type = data.type
    this.repoUserName = data.repoUserName
    this.repoName = data.repoName
    // foreign key
    this.repo_language_id = this.data.repo_language_id
  }

  setProperties () {
    this.setPostUserIssueProperties()
    this.setRepoLanguageProperties()
  }

  // private
  setPostUserIssueProperties(){
    let postUserIssue = new PostUserIssue(this.data)
    this.postUserIssue = postUserIssue

    this.postUserName = postUserIssue.userName
    this.postUserAvatarURL = postUserIssue.avatarURL
    this.postUserUserURL = postUserIssue.userURL
    this.body = postUserIssue.body
    this.createdAt = postUserIssue.createdAt
    this.updatedAt = postUserIssue.updatedAt
  }

  // private
  setRepoLanguageProperties(){
    let repoLanguage = new RepoLanguage(this.repo_language_id, this.data.relationships.repo_language)
    repoLanguage.setProperties()

    this.repoLanguage = repoLanguage
    this.mainLanguage = repoLanguage.mainLanguage
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
