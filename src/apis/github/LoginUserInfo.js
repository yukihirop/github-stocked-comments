'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'
import Followers from '@/models/github/Followers'
import Followings from '@/models/github/Followings'
import memory from '@/ext/Memory'
import Storage from '@/ext/Storage'

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
          memory.set('user_id', this.model.id)
        }
        resolve()
      })
    })
  }

  configureWhenSave(){
    let followers = new Followers()
    let followings = new Followings()
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

  // private
  isCurrentModelData(data) {
    if (this.model instanceof LoginUser){
      return this.model.id === data.user_id
    }
  }

  configureWhenFetch(){
    let followings = new Followings()
    this.model.relationships = [followings]
    this.targets = this.model.linkedResources()
  }
}