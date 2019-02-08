'use strict'

import Issue from '@/inject/models/main_content/main_li/Issue'
import IssueComment from '@/inject/models/main_content/main_li/IssueComment'
import Storage from '@/ext/Storage'

export default class MainLi {
  constructor(){
    this.payload = []
  }

  fetchData (resources, callback) {
    this.payload = []

    resources.reduce((promise, resource, index) => {
      return promise.then(() => {
        if (index === resources.length - 1) {
          this.createFetchResoruceDataPromise(resource).then(() => {
            setTimeout(_ => callback(null, this.payload))
          })
        } else {
          this.createFetchResoruceDataPromise(resource)
        }
      })
    },Promise.resolve())
  }

  // private
  createFetchResoruceDataPromise(resource){
    return new Promise((resolve, reject) => {
      this.fetchResourceData(resource)
        .then(dataFromStorage => {

          let dataWithRelationsihp = resource.createDataWithRelationship(dataFromStorage)

          Object.keys(dataWithRelationsihp).forEach((id, index) => {
            let data = dataWithRelationsihp[id]
            let factory = new Factory(id, data)
            let json = JSON.parse(JSON.stringify(factory))
            
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

// private
class Factory {
  constructor (id, data) {
    if (data.type === 'issue') {
      return new Issue(id, data)
    } else if (data.type === 'issuecomment') {
      return new IssueComment(id, data)
    }
  }
}
