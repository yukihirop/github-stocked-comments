'use strict'

import storage from '@/ext/storage'

export default class Base {
  constructor (id, data) {
    this.id = id
    this.type = data.type
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  fetchData (callback) {
    storage.fetchCommentData()
      .then((dataFromStorage) => {
        let data = dataFromStorage[this.id]
        this.setProperties(data)
        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  // private
  setProperties (issueData, callback = () => {}) {
    let error = new Error('Override in extends class')
    throw error
  }
}
