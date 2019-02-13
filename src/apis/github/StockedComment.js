'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'
import Issue from '@/models/github/Issue'
import IssueComment from '@/models/github/IssueComment'

export default class StockedComment extends BaseApi {
  /******************/
  /*** Save Func  ***/
  /******************/

  saveData (callback) {
    this.configureWhenSave()
    super.saveData(callback)
  }

  configureWhenSave(){
    if (this.params.type === 'issue') {
      let issue = new Issue()
      this.model.relationships = [issue]
    } else if (this.params.type === 'issuecomment') {
      let issuecomment = new IssueComment()
      this.model.relationships = [issuecomment]
    }
    this.targets = this.model.allDepthRelationships()
    return this
  }

  /*******************/
  /*** Fetch Func  ***/
  /*******************/

  
  fetchData (callback) {
    this.configureWhenFetch()
    super.fetchData(callback)
  }

  // private
  isCurrentModelData(data) {
    if (this.model instanceof LoginUser){
      return this.model.id === data.user_id
    }
  }

  configureWhenFetch(){
    let issue = new Issue()
    let issuecomment = new IssueComment()
    this.model.relationships = [issue, issuecomment]
    this.targets = this.model.relationships
    return this
  }
}
