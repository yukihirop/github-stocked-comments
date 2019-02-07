'use strict'

import createOctokitAuthClient from '@/content/authClient'

export default class Base {
  constructor (params) {
    this.repoUserName = params.repoUserName
    this.repoName = params.repoName
    this.authClient = createOctokitAuthClient()
    this.data = {}
  }

  // private
  createId(params){
    let error = new Error('Implement inherit class')
    throw error
  }

  // private
  dataFromOctokit () {
    let error = new Error('Implement inherit class')
    throw error
  }

  buildSaveData(){
    let result = {}
    this.data.id = this.id
    this.data.repoUserName = this.repoUserName
    this.data.repoName = this.repoName
    result[this.id] = this.data
    return result
  }

  appendForeignKeys(models){
    models.forEach(model => {
      this.data[model.foreignKey] = model.id
    })
    return this
  }
}
