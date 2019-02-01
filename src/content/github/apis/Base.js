'use strict'

import Octokit from '@octokit/rest'
import storage from '@/ext/storage'

export default class Base {
  constructor (params) {
    this.id = params.id
    this.repoUserName = params.repoUserName
    this.repoName = params.repoName
    this.type = params.type
    this.octokit = new Octokit()
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveData (callback) {
    this.dataFromOctokit()
      .then((issueData) => {
        let data = {}
        data[this.id] = issueData
        data[this.id]['type'] = this.type
        storage.saveCommentMetaData(data).then((data) => {
          console.log(data)
        })

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  // private
  dataFromOctokit () {
    let error = new Error('Override in extends class')
    throw error
  }
}
