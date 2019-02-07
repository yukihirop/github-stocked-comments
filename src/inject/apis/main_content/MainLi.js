'use strict'

import Issue from '@/inject/models/main_content/main_li/Issue'
import IssueComment from '@/inject/models/main_content/main_li/IssueComment'
import storage from '@/ext/storage'

export default class MainLi {
  fetchData (categories, relationshipCategories, callback) {
    storage.fetchData(categories, relationshipCategories)
      .then((dataFromStorage) => {
        let payload = []

        Object.keys(dataFromStorage).forEach((id) => {
          let data = dataFromStorage[id]
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
