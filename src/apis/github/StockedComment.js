'use strict'

import BaseApi from './BaseApi'
import Issue from '@/models/github/Issue'
import IssueComment from '@/models/github/IssueComment'
import LoginUser from '@/models/github/LoginUser'

export default class StockedComment extends BaseApi {
  /******************/
  /*** Save Func  ***/
  /******************/

  //private
  dataFromOctokit(params){
    this.setModel(params)
    return new Promise(resolve => {
      this.model.dataFromOctokitWithRelations(params).then(() => {
        resolve(this.model)
      })
    })
  }

  setModelWhenSave(){
    if (this.params.type === 'issue') {
      let issue = new Issue()
      this.model.relationships = [issue]
    } else if (this.params.type === 'issuecomment') {
      let issuecomment = new IssueComment()
      this.model.relationships = [issuecomment]
    }
    return this
  }

  /*******************/
  /*** Fetch Func  ***/
  /*******************/

  // private
  isCurrentModelData(data) {
    if (this.model instanceof LoginUser){
      return this.model.id === data.user_id
    }
  }

  setModelWhenFetch(){
    let issue = new Issue()
    let issuecomment = new IssueComment()
    this.model.relationships = [issue, issuecomment]
    return this
  }
}
