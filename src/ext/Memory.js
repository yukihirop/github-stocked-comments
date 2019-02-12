'use strict'

// https://qiita.com/hkusu/items/d9ac2bd135e9e579e018
class Memory {
  constructor(){
    this.map = new Map
  }

  set(key, value){
    this.map.set(key, value)
  }

  get(key){
    return this.map.get(key)
  }
}

export default new Memory()