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

          let dataWithRelationships = resource.createDataWithRelationship(dataFromStorage)

          Object.keys(dataWithRelationships).forEach((id, index) => {
            let data = dataWithRelationships[id]
            let json = resource.buildFetchData(id, data)
            
            this.payload.push(json)
          })



          resolve()
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
      })
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
