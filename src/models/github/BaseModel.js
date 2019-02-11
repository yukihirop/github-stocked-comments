'use strict'

import createOctokitAuthClient from '@/content/authClient'

export default class BaseModel {
  constructor () {
    this.authClient = createOctokitAuthClient()
    this.data = {}
    // Please override in inherit class
    this.type = 'base'
    this.id = 0
  }

  get name(){
    return this.type
  }

  get foreignKey(){
    return `${this.type}_id`
  }

  get relationships(){
    return []
  }

  linkedResources(){
    let result = []
    result.push(this)
    this.relationships.forEach(relationship => { result.push(relationship) })
    return result
  }

  // Please override in inherit class
  fields(){
    let error = new Error('Implement inherit class')
    throw error
  }

  outer_fields(){
    return {}
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
      promises = this.relationships.reduce((base, relationship) => {
        base.push(relationship.dataFromOctokit(params))
        return base
      },[this.dataFromOctokit(params)])
    } else {
      promises = [this.dataFromOctokit(params)]
    }

    return Promise.all(promises)
  }

  buildSaveData(params){
    let result = {}
    this.appendForeignKeys(this.relationships)
    this.data.id = this.id
    this.data.type = this.type
    this.data.repoUserName = params.repoUserName
    this.data.repoName = params.repoName
    result[this.id] = this.data
    return result
  }

  appendForeignKeys(models){
    if (models === undefined) return
    models.forEach(model => {
      this.data[model.foreignKey] = model.id
    })
  }

  /******************/
  /*** Fetch Func ***/
  /******************/

  buildFetchData(id, dataWithRelationship){
    let relationshipsData = dataWithRelationship.relationships
    this.setProperties(id, dataWithRelationship)
    this.relationships.forEach(relationship => {
      let relationship_data = relationshipsData[relationship.name]
      let relationship_id = relationship_data.id
      relationship.buildFetchData(relationship_id, relationship_data)
    })
    let fields = this.fields()
    let outer_fields = this.outer_fields()
    Object.assign(fields, outer_fields)
    return fields
  }

  createDataWithRelationship(dataFromStorage){
    let merged = this.mergedData(dataFromStorage)
    let baseData = merged[this.name]

    if(baseData === undefined) return {}

    Object.keys(baseData).forEach(key => {
      let unitResource = baseData[key]
      unitResource.relationships = {}

      this.relationships.forEach(relationship => {
        let foreignKeyValue = unitResource[relationship.foreignKey]
        let relationshipData = merged[relationship.name][foreignKeyValue].data
        unitResource.relationships[relationship.name] = relationshipData
      })

      baseData[key] = unitResource
    })

    return baseData
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
    let error = new Error('Override in extends class')
    throw error
  }
}
