'use strict'

export default class Base {
  constructor (id, data) {
    this.id = id
    this.type = data.type
    this.data = data
  }

  setProperties () {
    let error = new Error('Override in extends class')
    throw error
  }
}
