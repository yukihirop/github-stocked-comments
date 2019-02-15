'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'

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
    if (this.params.type === 'issue') {
      let issue = this.model.build_issue()
      this.model.relationships = [issue]
    } else if (this.params.type === 'issuecomment') {
      let issuecomment = this.model.build_issuecomment()
      this.model.relationships = [issuecomment]
    }
    this.targets = this.model.allDepthRelationships()
  }

  /*******************/
  /*** Fetch Func  ***/
  /*******************/

  
  fetchData (callback) {
    this.configureWhenFetch()
    super.fetchData(callback)
  }

  configureWhenFetch(){
    let issue = this.model.build_issue()
    let issuecomment = this.model.build_issuecomment()
    this.model.relationships = [issue, issuecomment]
    this.targets = this.model.relationships
  }
}
