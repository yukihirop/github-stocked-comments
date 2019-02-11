'use strict'

import BaseModel from './BaseModel'

const FIXED_PAGE = 1

export default class Followers extends BaseModel {
  constructor(){
    super()
    this.userGithubId = 0
    // override
    this.type = 'followers'
  }

  get relationships(){
    return []
  }

  fields(){
    return {
      id: this.id,
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
    return this.authClient.users.listFollowersForUser(
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

  setProperties(id, data){
    this.id = id
    this.data = data
  }
}