'use strict'

import storage from '@/ext/storage'
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
      .then((models) => {
        let data = this.buildSaveData(models)
        let categories = this.buildCategories(models)

        storage.saveData(categories, data).then((data) => {
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

      Promise.all( [ this.baseModel.dataFromOctokit(), repoLanguage.dataFromOctokit() ] ).then((result) => {
        this.baseModel.appendForeignKeys([repoLanguage])

        resolve([this.baseModel, repoLanguage])
      })
    })
  }

  // private
  buildSaveData(models){
    let result = {}
    models.forEach(model => {
      result[model.category] = model.buildSaveData()
    })
    return result
  }

  buildCategories(models){
    let result = []
    models.forEach(model => {
      result.push(model.category)
    })
    return result
  }
}
