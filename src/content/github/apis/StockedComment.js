'use strict'

import Storage from '@/ext/Storage'
import Issue from '@/content/github/models/Issue'
import IssueComment from '@/content/github/models/IssueComment'
import RepoLanguage from '@/content/github/models/RepoLanguage'

export default class StockedComment {
  constructor (params) {
    if (params.type === 'issue') {
      this.baseModel = new Issue(params)
    } else if (params.type === 'issuecomment') {
      this.baseModel = new IssueComment(params)
    }
  }

  dataFromOctokit(){
    return new Promise(resolve => {
      this.baseModel.dataFromOctokitWithRelations().then(() => {
        resolve(this.baseModel)
      })
    })
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveData (callback) {
    this.dataFromOctokit()
      .then((resource) => {
        this.saveResourceData(resource, callback)
      })
  }

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
