'use strict'

import Storage from '@/ext/Storage'
import LoginUser from '@/models/github/LoginUser'

export default class BaseApi {
  constructor (model = null, params = {}) {
    // Please override in inherit class
    this.model = (model === null) ?  new LoginUser() : model
    this.payload = []
    this.params = params
    this.targets = this.model.allDepthRelationships()
  }

  // private
  mergedData(dataFromStorage){
    let result = dataFromStorage.reduce((base, data) => {
      Object.assign(base, data)
      return base
    },{})
    return result
  }

  /*******************/
  /*** Delete Func ***/
  /*******************/
  configureWhenDelete(){
    let error = new Error('Implement inherit class')
    throw error
  }

  deleteData(id, callback){
    this.payload = []

    let deleteDataSize = this.targets.length
    // exclude model
    this.targets.reduce((promise, target, index) => {
      return promise.then(() => {
        if (index === deleteDataSize - 1) {
          this.createDeleteModelDataPromise(target, id, callback).then(() => {
            setTimeout(_ => callback(null, this.payload))
          })
        } else {
          this.createDeleteModelDataPromise(target, id, callback)
        }
      })
    },Promise.resolve())
  }

  // private
  createDeleteModelDataPromise(target, id, callback){
    return new Promise((resolve, reject) => {
      this.deleteModelData(target, id)
        .then(dataFromStorage => {

          Object.values(this.mergedData(dataFromStorage)).forEach(unitData => {
            this.payload.push(unitData)
          })

          resolve()
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
      })
  }

  // private
  deleteModelData(target, id) {
    let promises = target.linkedResources().reduce((base, model) => {
      base.push(model.deleteData(id))
      return base
    },[])

    return Promise.all(promises)
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  configureWhenSave(){
    let error = new Error('Implement inherit class')
    throw error
  }

  saveData (callback) {
    this.dataFromOctokit()
      .then(() => {
        this.saveModelData(callback)
      })
  }

  //private
  dataFromOctokit(){
    return new Promise(resolve => {
      Promise.all(this.model.dataFromOctokitWithRelations(this.params)).then(() => {
        resolve()
      })
    })
  }

  //private
  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveModelData(callback){
    // exclude model
    this.targets.forEach(target => {
      let storage = new Storage(target.name)
      let data = target.buildSaveData(this.params)

      storage.addData(data)
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

  configureWhenFetch(){
    let error = new Error('Implement inherit class')
    throw error
  }

  fetchData (callback) {
    this.payload = []

    let fetchDataSize = this.targets.length
    // exclude model
    this.targets.reduce((promise, target, index) => {
      return promise.then(() => {
        if (index === fetchDataSize - 1) {
          this.createFetchModelDataPromise(target, callback).then(() => {
            setTimeout(_ => callback(null, this.payload))
          })
        } else {
          this.createFetchModelDataPromise(target, callback)
        }
      })
    },Promise.resolve())
  }

  // private
  createFetchModelDataPromise(target, callback){
    return new Promise((resolve, reject) => {
      this.fetchModelData(target)
        .then(dataFromStorage => {

          this.buildFetchData(target, dataFromStorage).forEach(unitData => {
            this.payload.push(unitData)
          })

          resolve()
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
      })
  }

  buildFetchData(target, dataFromStorage){
    let repository = this.modelsRepositoryWithRelationships(target, dataFromStorage)
    let targetData = repository[target.name]
    return targetData.map(unitData => {
      target.relationships.forEach(relationship => {
        let relationshipId = unitData[relationship.foreignKey]
        let relationshipName = relationship.name
        unitData[relationshipName] = repository[relationshipName].filter(data => { return data.id === relationshipId })
      })
      return unitData
    })
  }

  // private
  modelsRepositoryWithRelationships(target, dataFromStorage) {
    let targets = []
    let result = {}

    // mergedData example:
    // { 'issue': { .... }, 'repo_language': { ... }}
    let mergedData = this.mergedData(dataFromStorage)
    Object.keys(mergedData).forEach((type) => {
      let data = mergedData[type]
      if (target.type === type ){
        // unitData example:
        // pomber-git-history-29-issuecomment-461114609: {status: 200, url: "https://api.github.com/repos/pomber/git-history/is…t_secret=3c1e238e2eb028c90d397ccfab0fc2b2554b51c1", headers: {…}, data: {…}, repo_language_id: "pomber-git-history-repo_language", …}
        Object.values(data).forEach(unitData => {
          let fetchData = target.buildFetchData(unitData['id'], unitData)
          targets.push(fetchData)
        })
      } else {
        target.relationships.forEach(relationship => {
          if(relationship.type === type) {
            let relationships = this.modelsRepositoryWithRelationships(relationship, dataFromStorage)
            result[relationship.name] = relationships[relationship.name]
          }
        })
      }
    })
    result[target.name] = targets
    return result
  }

  // private
  fetchModelData(target) {
    let promises = target.linkedResources().reduce((base, model) => {
      base.push(model.fetchData())
      return base
    },[])

    return Promise.all(promises)
  }
}
