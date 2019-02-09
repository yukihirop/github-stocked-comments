'use strict'

import Base from './Base'
import Followers  from './Followers'
import Following from './Following'

export default class LoginUser extends Base {
  constructor(params) {
    super(params)
    this.userName = this.params.userName
    this.followers = new Followers(params)
    this.following = new Following(params)
    // override
    this.type = 'user'
  }

  relationships(){
    return [this.followers, this.following]
  }

  createId(params){
    return `${params.userName}-${this.userGithubId}-${this.type}`
  }

  dataFromOctokit(){
    return this.authClient.users.getByUsername(
    {
      username: `${this.userName}`
    }).then(result => {
      this.data = result
      
      let update_params = { userGithubId: result.data.id }
      this.updateProperties(update_params)
      this.followers.updateProperties(update_params)
      this.following.updateProperties(update_params)
    }).catch(error => {
      console.log(error)
    })
  }

  buildSaveData(){
    let result = {}
    this.appendForeignKeys(this.relationships())
    this.data.id = this.id
    this.data.repoUserName = this.repoUserName
    this.data.repoName = this.repoName
    this.data.type = this.type
    this.data.loginUser = true
    result[this.id] = this.data
    return result
  }

  updateProperties(params = {}){
    if (params === {}){
      this.id = this.createId(this.params)
    } else {
      Object.keys(params).forEach(key => {
        let value = params[key]
        switch(key){
          case 'userGithubId':
            this.userGithubId = value
            this.id = this.createId(this.params)
            
            break
          default:
            this.id = this.createId(this.params)

            break
        }
      })
    }
  }
}