'use strict'

import Base from './Base'

export default class RepoLanguage extends Base {
  constructor (params) {
    super(params)
    this.repoUserName = this.params.repoUserName
    this.repoName = this.params.repoName
    // override
    this.type = 'repo_language'
    this.id = this.createId(this.params)
  }

  relationships(){
    return []
  }

  // private
  createId(params){
    return `${params.repoUserName}-${params.repoName}-${this.type}`
  }

  dataFromOctokit () {
    return this.authClient.repos.listLanguages({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
    }).then(result => {
      this.data = result
    }).catch(error => {
      console.log(error)
    })
  }
}
