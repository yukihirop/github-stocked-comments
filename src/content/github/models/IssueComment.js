'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class IssueComment extends Base {
  constructor (params) {
    super(params)
    this.repoUserName = this.params.repoUserName
    this.repoName = this.params.repoName
    this.commentId = this.params.commentId
    this.repoLanguage = new RepoLanguage(this.params)
    // override
    this.type = this.params.type
    this.id = this.createId(params)
  }

  relationships(){
    return [this.repoLanguage]
  }

  // private
  createId(params){
    return `${params.repoUserName}-${params.repoName}-${params.issueId}-${params.type}-${params.commentId}`
  }

  dataFromOctokit () {
    return this.authClient.issues.getComment({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      comment_id: `${Number(this.commentId)}`
    }).then(result => {
      this.data = result
    }).catch(error => {
      console.log(error)
    })
  }
}
