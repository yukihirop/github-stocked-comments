'use strict'

var storageKey = 'github-stocked-comments'
// TODO: change from local to sync.
var remote = chrome.storage.local

export default {
  storageKey () {
    return storageKey
  },
  onChangeData (callback) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      callback(changes, namespace)
    })
  },
  saveCommentMetaData (data) {
    return new Promise((resolve, reject) => {
      remote.get(storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let dataFromStorage = {}
          if (result[storageKey] !== void 0) {
            dataFromStorage = JSON.parse(result[storageKey])
          }
          resolve(dataFromStorage)
        }
      })
    }).then((dataFromStorage) => {
      return new Promise((resolve, reject) => {
        Object.assign(dataFromStorage, data)
        remote.set({ [storageKey]: JSON.stringify(dataFromStorage) }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError)
          } else {
            remote.get([storageKey], (result) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
              } else {
                resolve(JSON.parse(result[storageKey]))
              }
            })
          }
        })
      })
    })
  },
  getCommentMetaData () {
    return new Promise((resolve, reject) => {
      remote.get(storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let dataFromStorage = JSON.parse(result[storageKey])
          resolve(dataFromStorage)
        }
      })
    })
  }
}
