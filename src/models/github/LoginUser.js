'use strict'

import BaseModel from './BaseModel'
import Followings from './Followings'
import Followers from './Followers'
import Issue from './Issue'
import IssueComment from './IssueComment'
import Storage from '@/ext/Storage'
import memory from '@/ext/Memory'

export default class LoginUser extends BaseModel {
  constructor() {
    super()
    // override
    this.type = 'user'
    this.id = memory.get('login_user_id')
    this.storage = new Storage(this.name)
  }

  fields(){
    return {
      id: this.id,
      type: this.type,
      userName: this.userName,
      followings_id: this.followings_id
    }
  }

  build_issue(){
    let instance = new Issue()
    instance.user_id = this.id
    return instance
  }

  build_issuecomment(){
    let instance = new IssueComment()
    instance.user_id = this.id
    return instance
  }

  build_followings(){
    let instance = new Followings()
    instance.user_id = this.id
    return instance
  }

  build_followers(){
    let instance = new Followers()
    instance.user_id = this.id
    return instance
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
      this.updateProperties(params, { userGithubId: result.data.id })
      
      let update_params = { user_id: this.id }
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
  fetchData(){
    this.storage.where({ id: this.id })
    return this.storage.fetchData()
  }

  setProperties (_, data) {
    this.data = data
    this.userName = data['data'].login
    this.followings_id = data.followings_id
  }
}