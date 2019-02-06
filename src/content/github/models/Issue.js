'use strict'

import Base from './Base'

export default class Issue extends Base {
  constructor (params) {
    super(params)
    this.id = this.createId(params)
    this.type = params.type
    this.issueId = params.issueId
    this.category = 'issue'
    this.foreignKey = 'issue_id'
  }

  // private
  createId(params){
    return `${params.repoUserName}-${params.repoName}-${params.issueId}-${params.type}-${params.commentId}`
  }

  // private
  dataFromOctokit () {
    return this.authClient.issues.get({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      number: `${Number(this.issueId)}`
    }).then(result => {
      this.data = result
      this.data.type = this.type
    })
  }
}
