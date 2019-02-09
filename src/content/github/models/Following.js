'use strict'

import Base from './Base'

export default class Following extends Base {
  constructor(params){
    super(params)
    this.userName = this.params.userName
    this.userGithubId = 0
    // override
    this.type = 'following'
    this.id = this.createId(this.params)
  }

  relationships(){
    return []
  }

  createId(params){
    return `${params.userName}-${this.userGithubId}-${this.type}`
  }

  dataFromOctokit(){
    return this.authClient.users.listFollowingForUser(
    {
      username: `${this.userName}`,
      per_page: 100,
      page: 500
    }).then(result => {
      this.data = result
    }).catch(error => {
      console.log(error)
    })
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