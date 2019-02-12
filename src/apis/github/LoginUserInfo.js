'use strict'

import BaseApi from './BaseApi'
import Followers from '@/models/github/Followers'
import Followings from '@/models/github/Followings'
import memory from '@/ext/Memory'
import Storage from '@/ext/Storage'

export default class LoginUserInfo extends BaseApi {
  // private
  get targets() {
    return this.model.linkedResources()
  }

  /******************/
  /*** Save Func  ***/
  /******************/

  // private
  dataFromOctokit(){
    return new Promise(resolve => {
      this.model.dataFromOctokitWithRelations(this.params).then(() => {
        if (this.model instanceof LoginUser) {
          memory.set('user_id', this.model.id)
        }
        resolve()
      })
    })
  }

  setModelWhenSave(){
    let followers = new Followers()
    let followings = new Followings()
    this.model.relationships = [followers, followings]
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
    let followings = new Followings()
    this.model.relationships = [followings]
    return this
  }
}