'use strict'

import BaseApi from './BaseApi'
import Issue from '@/models/github/Issue'
import IssueComment from '@/models/github/IssueComment'

export default class StockedComment extends BaseApi {
  /******************/
  /*** Save Func  ***/
  /******************/

  //private
  dataFromOctokit(params){
    this.setBaseModel(params)
    return new Promise(resolve => {
      this.baseModel.dataFromOctokitWithRelations(params).then(() => {
        resolve(this.baseModel)
      })
    })
  }

  // private
  setBaseModel(params){
    if (params.type === 'issue') {
      this.baseModel = new Issue(params)
    } else if (params.type === 'issuecomment') {
      this.baseModel = new IssueComment(params)
    }
  }
}
