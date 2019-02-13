'use strict'

import createOctokitAuthClient from '@/content/authClient'
import memory from '@/ext/Memory'

export default class BaseModel {
  constructor () {
    this.authClient = createOctokitAuthClient()
    this.data = {}
    // Please override in inherit class
    this.type = 'base'
    this.id = 0
    this._relationships = []
  }

  get name(){
    return this.type
  }

  get foreignKey(){
    return `${this.type}_id`
  }

  get relationships(){
    return this._relationships || []
  }

  set relationships(value) {
    this._relationships = value
  }

  linkedResources(){
    let result = []
    result.push(this)
    this.relationships.forEach(relationship => { result.push(relationship) })
    return result
  }

  allDepthRelationships(){
    let relationships = this.relationships.reduce((parent, target) => {
      if (target.relationships.length !== 0) {
        target.allDepthRelationships().reduce((base, children) => {
          Object.assign(base, { [children.name]: children })
          return base
        }, parent)
      }
      Object.assign(parent,{ [target.name]: target })
      return parent
    },{})
    return Object.values(relationships)
  }

  // Please override in inherit class
  fields(){
    let error = new Error('Implement inherit class')
    throw error
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  // private
  createId(params){
    let error = new Error('Implement inherit class')
    throw error
  }

  // private
  dataFromOctokit (params) {
    let error = new Error('Implement inherit class')
    throw error
  }

  updateProperties(params, update_params = {}){
    if (Object.keys(update_params).length === 0) {
      this.id = this.createId(params)
    } else {
      let error = new Error('Implement inherit class')
      throw error
    }
  }

  dataFromOctokitWithRelations(params){
    let promises = []

    if (this.relationships !== []) {
      promises = this.relationships.reduce((parent, target) => {
        if (target.relationships !== []) {
          let children = target.dataFromOctokitWithRelations(params)
          children.reduce((base, child) => {
            base.push(child)
            return base
          }, parent)
        } else {
          parent.push(target.dataFromOctokit(params))
        }
        return parent
      },[this.dataFromOctokit(params)])
    } else {
      promises = [this.dataFromOctokit(params)]
    }

    return promises
  }

  buildSaveData(params){
    let result = {}
    this.appendForeignKeys()
    this.data.id = this.id
    this.data.type = this.type
    this.data.repoUserName = params.repoUserName
    this.data.repoName = params.repoName
    this.data.issueTitle = params.issueTitle
    result[this.id] = this.data
    return result
  }

  // private
  appendForeignKeys(){
    if (this.relationships === undefined) return
    this.relationships.forEach(model => {
      this.data[model.foreignKey] = model.id
    })
    this.data['user_id'] = memory.get('user_id')
  }

  /******************/
  /*** Fetch Func ***/
  /******************/

  buildFetchData(id, data){
    this.setProperties(id, data)
    return this.fields()
  }

  // private
  mergedData(dataFromStorage){
    let result = dataFromStorage.reduce((base, data) => {
      Object.assign(base, data)
      return base
    },{})
    return result
  }

  setProperties (id, data) {
    let error = new Error('Implement inherit class')
    throw error
  }
}
