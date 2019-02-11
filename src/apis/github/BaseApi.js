'use strict'

import Storage from '@/ext/Storage'

export default class BaseApi {
  constructor () {
    // Please override in inherit class
    this.baseModel = null
    this.payload = []
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  saveData (params, callback) {
    this.dataFromOctokit(params)
      .then((resource) => {
        this.saveResourceData(params, resource, callback)
      })
  }

  //private
  dataFromOctokit(params){
    return new Promise(resolve => {
      this.baseModel.dataFromOctokitWithRelations(params).then(() => {
        resolve(this.baseModel)
      })
    })
  }

  //private
  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveResourceData(params, resource, callback){
    resource.linkedResources().forEach(resource => {
      let storage = new Storage(resource.name)
      let data = resource.buildSaveData(params)

      storage.saveData(data)
        .then(dataFromStorage => {
          console.log(dataFromStorage)
          setTimeout(_ => callback(null, true))
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
    })
  }

  /******************/
  /*** Fetch Func ***/
  /******************/

  fetchData (resources, callback) {
    this.payload = []

    resources.reduce((promise, resource, index) => {
      return promise.then(() => {
        if (index === resources.length - 1) {
          this.createFetchResoruceDataPromise(resource, callback).then(() => {
            setTimeout(_ => callback(null, this.payload))
          })
        } else {
          this.createFetchResoruceDataPromise(resource, callback)
        }
      })
    },Promise.resolve())
  }

  // private
  createFetchResoruceDataPromise(resource, callback){
    return new Promise((resolve, reject) => {
      this.fetchResourceData(resource)
        .then(dataFromStorage => {

          this.buildFetchData(resource, dataFromStorage).forEach(unitData => {
            this.payload.push(unitData)
          })

          resolve()
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
      })
  }

  buildFetchData(resource, dataFromStorage){
    let repository = this.resourcesRepositoryWithRelationships(resource, dataFromStorage)
    let resourceData = repository[resource.name]
    return resourceData.map(unitData => {
      resource.relationships.forEach(relationship => {
        let relationshipId = unitData[relationship.foreignKey]
        let relationshipName = relationship.name
        unitData[relationshipName] = repository[relationshipName].filter(data => { return data.id === relationshipId })
      })
      return unitData
    })
  }

  // private
  resourcesRepositoryWithRelationships(resource, dataFromStorage) {
    let resources = []
    let result = {}

    // mergedData example:
    // { 'issue': { .... }, 'repo_language': { ... }}
    let mergedData = this.mergedData(dataFromStorage)
    Object.keys(mergedData).forEach((type) => {
      let data = mergedData[type]
      if (resource.type === type ){
        // unitData example:
        // pomber-git-history-29-issuecomment-461114609: {status: 200, url: "https://api.github.com/repos/pomber/git-history/is…t_secret=3c1e238e2eb028c90d397ccfab0fc2b2554b51c1", headers: {…}, data: {…}, repo_language_id: "pomber-git-history-repo_language", …}
        Object.values(data).forEach(unitData => {
          let fetchData = resource.buildFetchData(unitData['id'], unitData)
          resources.push(fetchData)
        })
      } else {
        resource.relationships.forEach(relationship => {
          if(relationship.type === type) {
            let relationships = this.resourcesRepositoryWithRelationships(relationship, dataFromStorage)
            result[relationship.name] = relationships[relationship.name]
          }
        })
      }
    })
    result[resource.name] = resources
    return result
  }

  // private
  mergedData(dataFromStorage){
    let result = dataFromStorage.reduce((base, data) => {
      Object.assign(base, data)
      return base
    },{})
    return result
  }

  // private
  fetchResourceData(resource) {
    let promises = this.fetchResourcesName(resource).reduce((base, resourceName) => {
      let storage = new Storage(resourceName)
      base.push(storage.fetchData())
      return base
    },[])

    return Promise.all(promises)
  }

  // private
  fetchResourcesName(resource){
    let result = []
    result.push(resource.name)
    resource.relationships.forEach(relationship => { result.push(relationship.name) })
    return result
  }
}
