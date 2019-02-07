'use strict'

import Issue from '@/inject/models/main_content/main_li/Issue'
import IssueComment from '@/inject/models/main_content/main_li/IssueComment'
import Storage from '@/ext/Storage'

export default class MainLi {
  fetchData (resources, relationshipResources, callback) {

    let promises = resources.reduce((base, resourceName) => {
      base.push(this.fetchResourceData(resourceName, relationshipResources))
      return base
    },[])

    Promise.all(promises)
      .then((dataFromStorage) => {
        let payload = []

        let mergedData = dataFromStorage.reduce((base, resource) => {
          Object.assign(base, resource)
          return base
        },{})

        Object.keys(mergedData).forEach((id) => {

          let data = mergedData[id]
          let factory = new Factory(id, data)
          factory.setProperties()

          let json = JSON.parse(JSON.stringify(factory))
          payload.push(json)
        })

        setTimeout(_ => callback(null, payload))

      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  fetchResourceData(resourceName, relationshipResources) {
    let storage = new Storage(resourceName)
    return storage.fetchData(relationshipResources)
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
