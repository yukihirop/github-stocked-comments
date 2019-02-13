'use strict'

var convertFromResourceToStorageKey = resourceName => {
  let result = ''
  let data = {
    'issue':         'github-stocked-comments.github.issue',
    'issuecomment':  'github-stocked-comments.github.issuecomment',
    'repo_language': 'github-stocked-comments.github.repo_language',
    'user':          'github-stocked-comments.github.user',
    'followers':     'github-stocked-comments.github.followers',
    'followings':    'github-stocked-comments.github.followings',
    'liked':         'github-stocked-comments.extension.liked'
  }

  if (data[resourceName] === undefined){
    throw new Error(`Don't support resource: ${resourceName}`)
  } else {
    result = data[resourceName]
  }
  return result
}

/*
*
* Support storageKey:
*
* schema: [service-name(server)].[group(db)].[resource(table)]
*
* ・github-stocked-comments.github.issue
* ・github-stocked-comments.github.issuecomment
* ・github-stocked-comments.github.repo_language
* ・github-stocked-comments.extension.liked
*/
export default class Storage {
  constructor(resourceName){
    this.resourceName = resourceName
    this.storageKey = convertFromResourceToStorageKey(resourceName)
    this.storage = chrome.storage.local
  }

  onChangeData (callback) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      callback(changes, namespace)
    })
  }

  saveData(data){
    return new Promise((resolve, reject) => {
      this.storage.get(this.storageKey, (result) => {
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
        this.storage.set({ [this.storageKey]: JSON.stringify(dataFromStorage) }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError)
          } else {
            this.storage.get([this.storageKey], (result) => {
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

  fetchData () {
    return new Promise((resolve, reject) => {
      this.storage.get(this.storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let datadontExist = Object.keys(result).length === 0
          if(datadontExist) {
            resolve({ [this.resourceName]: {}})
          } else {
            let dataFromStorage = JSON.parse(result[this.storageKey])
            let data = { [this.resourceName]: dataFromStorage }
            resolve(data)
          }
        }
      })
    })
  }

  // filterLoginUserData(data){
  //   let keys = Object.keys(data).filter(key => {
  //     return data[key].user_id === this.user_id
  //   })
  //   return keys.reduce((base, key) => {
  //     base[key] = data[key]
  //     return base
  //   },{})
  // }
}