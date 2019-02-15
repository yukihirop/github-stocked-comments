'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'
import RepoLanguage from '@/models/github/RepoLanguage'

export default class StockedComment extends BaseApi {
  /********************/
  /*** Delete Func  ***/
  /********************/
  deleteData (id, callback){
    this.configureWhenDelete()
    super.deleteData(id, callback)
  }

  configureWhenDelete(){
    if (this.params.type === 'issue') {
      let issue = this.model.build_issue()
      this.model.relationships = [issue]
    } else if (this.params.type === 'issuecomment') {
      let issuecomment = this.model.build_issuecomment()
      this.model.relationships = [issuecomment]
    }
    this.targets = this.model.relationships
  }

  /******************/
  /*** Save Func  ***/
  /******************/

  saveData (callback) {
    this.configureWhenSave()
    super.saveData(callback)
  }

  configureWhenSave(){
    let repo_language = new RepoLanguage()

    if (this.params.type === 'issue') {
      let issue = this.model.build_issue()
      issue.relationships = [repo_language]
      this.model.relationships = [issue]
    } else if (this.params.type === 'issuecomment') {
      let issuecomment = this.model.build_issuecomment()
      issuecomment.relationships = [repo_language]
      this.model.relationships = [issuecomment]
    }
    this.targets = this.model.allDepthRelationships()
  }

  //private
  dataFromOctokit(){
    return new Promise(resolve => {
      Promise.all(this.model.dataFromOctokitWithRelations(this.params, false)).then(() => {
        resolve()
      })
    })
  }

  /*******************/
  /*** Fetch Func  ***/
  /*******************/

  
  fetchData (callback) {
    this.configureWhenFetch()
    super.fetchData(callback)
  }

  configureWhenFetch(){
    let repo_language = new RepoLanguage()

    let issue = this.model.build_issue()
    issue.relationships = [repo_language]

    let issuecomment = this.model.build_issuecomment()
    issuecomment.relationships = [repo_language]

    this.model.relationships = [issue, issuecomment]
    this.targets = this.model.relationships
  }
}
