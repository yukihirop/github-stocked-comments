'use strict'

import BaseModel from './BaseModel'
import Storage from '@/ext/Storage'

export default class RepoLanguage extends BaseModel {
  constructor () {
    super()
    // override
    this.type = 'repo_language'
    this.storage = new Storage(this.name)
  }

  fields(){
    return {
      id: this.id,
      type: this.type,
      mainLanguage: this.mainLanguage
    }
  }

  /*****************/
  /*** Save Func ***/
  /*****************/

  // private
  createId(params){
    return `${params.repoUserName}-${params.repoName}-${this.type}`
  }

  dataFromOctokit (params) {
    return this.authClient.repos.listLanguages({
      owner: `${params.repoUserName}`,
      repo: `${params.repoName}`,
    }).then(result => {
      this.data = result
      this.updateProperties(params)
    }).catch(error => {
      console.log(error)
    })
  }

  updateProperties(params, update_params = {}){
    if (Object.keys(update_params).length === 0) {
      this.id = this.createId(params)
    }
  }

  /******************/
  /*** Fetch Func ***/
  /******************/

  fetchData(){
    return this.storage.fetchData()
  }

  setProperties (id, data) {
    this.id = id
    this.data = data
    this.mainLanguage = this.createMainLanguage(data)
  }

  createMainLanguage(data){
    let bytes = Object.values(data['data'])
    let maxByte = Math.max.apply(null, bytes)
    let result = Object.keys(data['data']).filter(key => { return data['data'][key] === maxByte })[0]
    return result
  }
}
