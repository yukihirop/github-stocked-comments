'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class Issue extends Base {
  constructor (params) {
    super(params)
    this.repoUserName = this.params.repoUserName
    this.repoName = this.params.repoName
    this.issueId = this.params.issueId
    this.repoLanguage = new RepoLanguage(this.params)
    // override
    this.type = this.params.type
    this.id = this.createId(this.params)
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
    }).catch(error => {
      console.log(error)
    })
  }
}
