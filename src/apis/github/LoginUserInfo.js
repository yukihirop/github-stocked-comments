'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'
import memory from '@/ext/Memory'

export default class LoginUserInfo extends BaseApi {
  /******************/
  /*** Save Func  ***/
  /******************/

  saveData (callback) {
    this.configureWhenSave()
    super.saveData(callback)
  }

  // private
  dataFromOctokit(){
    return new Promise(resolve => {
      Promise.all(this.model.dataFromOctokitWithRelations(this.params)).then(() => {
        if (this.model instanceof LoginUser) {
          let login_user_id = this.model.id
          memory.set('login_user_id', login_user_id)
        }
        resolve()
      })
    })
  }

  configureWhenSave(){
    let followers = this.model.build_followers()
    let followings = this.model.build_followings()
    this.model.relationships = [followers, followings]
    this.targets = this.model.linkedResources()
  }

  /*******************/
  /*** Fetch Func  ***/
  /*******************/

  fetchData (callback) {
    this.configureWhenFetch()
    super.fetchData(callback)
  }

  configureWhenFetch(){
    let followings = this.model.build_followings()
    this.model.relationships = [followings]
    this.targets = this.model.linkedResources()
  }
}