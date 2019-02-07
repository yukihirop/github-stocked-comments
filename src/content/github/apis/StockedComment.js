'use strict'

import Storage from '@/ext/Storage'
import Issue from '@/content/github/models/Issue'
import IssueComment from '@/content/github/models/IssueComment'
import RepoLanguage from '@/content/github/models/RepoLanguage'

export default class StockedComment {
  constructor (params) {
    this.params = params
    if (params.type === 'issue') {
      this.baseModel = new Issue(params)
    } else if (params.type === 'issuecomment') {
      this.baseModel = new IssueComment(params)
    }
  }

  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  saveData (callback) {
    this.dataFromOctokit()
      .then((result) => {
        let resourceName = Object.keys(result.base)[0]
        let data = result.base[resourceName]
        let relationshipResourcesData = result.relationshipResourcesData

        let storage = new Storage(resourceName)
        storage.saveData(data, relationshipResourcesData).then((data) => {
          console.log(data)
        })

        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  dataFromOctokit(){
    return new Promise(resolve => {
      let repoLanguage = new RepoLanguage(this.params)

      Promise.all( [ this.baseModel.dataFromOctokit(), repoLanguage.dataFromOctokit() ] ).then(() => {
        this.baseModel.appendForeignKeys([repoLanguage])

        let result = {}
        result.base = {}
        result.relationshipResourcesData = {}
        result.base[this.baseModel.resourceName] = this.baseModel.buildSaveData()
        result.relationshipResourcesData[repoLanguage.resourceName] = repoLanguage.buildSaveData()
        resolve(result)
      })
    })
  }
}
