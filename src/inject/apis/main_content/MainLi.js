'use strict'

import Issue from '@/inject/apis/main_content/main_li/Issue'
import IssueComment from '@/inject/apis/main_content/main_li/IssueComment'
import storage from '@/ext/storage'

export default class MainLi {
  fetchCommentData (callback) {
    storage.fetchCommentData()
      .then((dataFromStorage) => {
        let payload = {}
        Object.keys(dataFromStorage).forEach((id) => {
          let data = dataFromStorage[id]
          let factory = new Factory(id, data)
          factory.setProperties()

          payload[id] = factory
        })
        setTimeout(_ => callback(null, payload))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }
}

class Factory {
  constructor (id, data) {
    if (data.type === 'issue') {
      return new Issue(id, data)
    } else if (data.type === 'issuecomment') {
      return new IssueComment(id, data)
    }
  }
}
