'use strict'

import createOctokitAuthClient from '@/content/authClient'

export default class Base {
  constructor (params, options = {}) {
    Object.assign(params, options)
    this.params = params
    this.authClient = createOctokitAuthClient()
    this.data = {}
    // Please override in inherit class
    this.type = 'base'
    this.id = 0
  }

  get name(){
    return this.type
  }

  get resourceName(){
    return this.type
  }

  get foreignKey(){
    return `${this.type}_id`
  }

  linkedResources(){
    let result = []
    result.push(this)
    this.relationships().forEach(relationship => { result.push(relationship) })
    return result
  }

  relationships(){
    return []
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

  updateProperties(params = {}){
    if (params === {}) {
      this.id = this.createId(this.params)
    } else {
      let error = new Error('Implement inherit class')
      throw error
    }
  }

  dataFromOctokitWithRelations(){
    let promises = []

    if (this.relationships() !== []) {
      promises = this.relationships().reduce((base, relationship) => {
        base.push(relationship.dataFromOctokit())
        return base
      },[this.dataFromOctokit()])
    } else {
      promises = [this.dataFromOctokit()]
    }

    return Promise.all(promises)
  }

  buildSaveData(){
    let result = {}
    this.appendForeignKeys(this.relationships())
    this.data.id = this.id
    this.data.repoUserName = this.repoUserName
    this.data.repoName = this.repoName
    this.data.type = this.type
    result[this.id] = this.data
    return result
  }

  appendForeignKeys(models){
    if (models === undefined) return
    models.forEach(model => {
      this.data[model.foreignKey] = model.id
    })
  }
}
