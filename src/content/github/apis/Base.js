'use strict'

import Storage from '@/ext/Storage'

export default class Base {
  constructor (params) {
    // Please override in inherit class
    this.baseModel = null
  }

  saveData (callback) {
    this.dataFromOctokit()
      .then((resource) => {
        this.saveResourceData(resource, callback)
      })
  }

  //private
  dataFromOctokit(){
    return new Promise(resolve => {
      this.baseModel.dataFromOctokitWithRelations().then(() => {
        resolve(this.baseModel)
      })
    })
  }

  //private
  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveResourceData(resource, callback){
    resource.linkedResources().forEach(resource => {
      let storage = new Storage(resource.name)
      let data = resource.buildSaveData()

      storage.saveData(data)
        .then(dataFromStorage => {
          setTimeout(_ => callback(null, true))
        })
        .catch((error) => {
          setTimeout(_ => callback(error))
        })
    })
  }
}
