'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class IssueComment extends Base {
  constructor (params) {
    super(params)
    this.id = this.createId(params)
    this.type = params.type
    this.commentId = params.commentId
    this.resourceName = 'issuecomment'
    this.foreignKey = 'issuecomment_id'
    this.repoLanguage = new RepoLanguage(this.params)
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
    })
  }
}
