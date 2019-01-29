'use strict'

export default class Storage {
  constructor () {
    this.storageKey = 'github-stocked-comments'
    // TODO: change from local to sync.
    this.remote = chrome.storage.local
  }

  saveCommentMetaData (data) {
    return new Promise((resolve, reject) => {
      this.remote.get(this.storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let dataFromStorage = {}
          if (result[this.storageKey] !== void 0) {
            dataFromStorage = JSON.parse(result[this.storageKey])
          }
          resolve(dataFromStorage)
        }
      })
    }).then((dataFromStorage) => {
      return new Promise((resolve, reject) => {
        Object.assign(dataFromStorage, data)
        this.remote.set({ [this.storageKey]: JSON.stringify(dataFromStorage) }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError)
          } else {
            this.remote.get([this.storageKey], (result) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
              } else {
                resolve(JSON.parse(result[this.storageKey]))
              }
            })
          }
        })
      })
    })
  }

  getCommentMetaData () {
    return new Promise((resolve, reject) => {
      this.remote.get(this.storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let dataFromStorage = JSON.parse(result[this.storageKey])
          resolve(dataFromStorage)
        }
      })
    })
  }
}
