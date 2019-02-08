'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class Issue extends Base {
  constructor (params) {
    super(params)
    this.id = this.createId(params)
    this.type = params.type
    this.issueId = params.issueId
    this.resourceName = 'issue'
    this.foreignKey = 'issue_id'
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
    return this.authClient.issues.get({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      number: `${Number(this.issueId)}`
    }).then(result => {
      this.data = result
    })
  }
}
