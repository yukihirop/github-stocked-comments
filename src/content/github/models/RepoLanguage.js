'use strict'

import Base from './Base'

export default class RepoLanguage extends Base {
  constructor (params) {
    super(params)
    this.id = this.createId(params)
    this.resourceName = 'repo_language'
    this.foreignKey = 'repo_language_id'
    this.type = 'repo_language'
  }

  relationships(){
    return []
  }

  // private
  createId(params){
    return params.repoUserName + '-' + params.repoName
  }

  dataFromOctokit () {
    return this.authClient.repos.listLanguages({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
    }).then(result => {
      this.data = result
    })
  }
}
