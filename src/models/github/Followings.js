'use strict'

import BaseModel from './BaseModel'
import Storage from '@/ext/Storage'

const FIXED_PAGE = 1

export default class Followings extends BaseModel {
  constructor(){
    super()
    this.userGithubId = 0
    // override
    this.type = 'followings'
    this.storage = new Storage(this.name)
  }

  get relationships(){
    return []
  }

  fields(){
    return {
      id: this.id,
      user_id: this.user_id,
      data: this.data['data']
    }
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  createId(params){
    return `${params.userName}-${this.userGithubId}-${this.type}`
  }

  dataFromOctokit(params){
    return this.authClient.users.listFollowingForUser(
    {
      username: `${params.userName}`,
      per_page: 50000,
      page: FIXED_PAGE
    }).then(result => {
      this.data = result
      this.updateProperties(params)
    }).catch(error => {
      console.log(error)
    })
  }

  updateProperties(params, update_params = {}){
    if (Object.keys(update_params).length === 0){
      this.id = this.createId(params)
    } else {
      Object.keys(update_params).forEach(key => {
        let value = update_params[key]
        switch(key){
          case 'userGithubId':
            this.userGithubId = value
            this.id = this.createId(params)
            break
          default:
            this.id = this.createId(params)

            break
        }
      })
    }
  }

  /******************/
  /*** Fetch Func ***/
  /******************/
  fetchData(){
    this.storage.where({ user_id: this.user_id })
    return this.storage.fetchData()
  }

  setProperties(id, data){
    this.id = id
    this.data = data
    // foreign key
    this.user_id = data.user_id
  }
}