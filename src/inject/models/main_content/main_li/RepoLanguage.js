'use strict'

import Base from './Base'

export default class RepoLanguage extends Base {
  constructor (id, data) {
    super(id, data)

    this.setProperties()
  }

  setProperties () {
    this.mainLanguage = this.createMainLanguage()
  }

  createMainLanguage(){
    let data = this.data
    let bytes = Object.values(data)
    let maxByte = Math.max.apply(null, bytes)
    let result = Object.keys(data).filter(key => { return data[key] === maxByte })[0]
    return result
  }
}
