'use strict'

import Base from './Base'

export default class RepoLanguage extends Base {
  setProperties () {
    let data = this.data.data
    this.mainLanguage = this.mainLanguage(data)
  }

  mainLanguage(data){
    let bytes = Object.values(data)
    let maxByte = Math.max.apply(null, bytes)
    let result = Object.keys(data).filter(key => { return data[key] === maxByte })[0]
    console.log("mainLanguage")
    console.log(data)
    console.log(result)
    return result
  }
}
