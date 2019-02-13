'use strict'

import BaseModel from './BaseModel'
import Followings from './Followings'

export default class LoginUser extends BaseModel {
  constructor() {
    super()
    // override
    this.type = 'user'
  }

  fields(){
    return {
      id: this.id,
      type: this.type,
      userName: this.userName,
      followings_id: this.followings_id
    }
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  createId(params){
    return `${params.userName}-${this.userGithubId}-${this.type}`
  }

  dataFromOctokit(params){
    return this.authClient.users.getByUsername(
    {
      username: `${params.userName}`
    }).then(result => {
      this.data = result
      
      let update_params = { userGithubId: result.data.id }
      this.updateProperties(params, update_params)
      this.relationships.forEach(relationhip => {
        relationhip.updateProperties(params, update_params)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  buildSaveData(params){
    let result = {}
    this.appendForeignKeys()
    this.data.id = this.id
    this.data.repoUserName = params.repoUserName
    this.data.repoName = params.repoName
    this.data.type = this.type
    this.data.loginUser = true
    result[this.id] = this.data
    return result
  }

  // private
  appendForeignKeys(){
    if (this.relationships === undefined) return
    this.relationships.forEach(model => {
      this.data[model.foreignKey] = model.id
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

  setProperties (id, data) {
    this.id = id
    this.data = data
    this.userName = data['data'].login
    this.followings_id = data.followings_id
  }
}