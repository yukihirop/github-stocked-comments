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
  saveData(categories, data){
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
        dataFromStorage = this.merge(categories, dataFromStorage, data)

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
  fetchData (categories) {
    return new Promise((resolve, reject) => {
      remote.get(storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let dataFromStorage = JSON.parse(result[storageKey])
          let data = {}
          categories.forEach(category => {
            Object.assign(data, dataFromStorage[category])
          })
          resolve(data)
        }
      })
    })
  },
  updateCommentData (id, data) {
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
        dataFromStorage[id] = data
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
  merge(categories, dataFromStorage, data) {
    categories.forEach(category => {
      dataFromStorage[category] = (dataFromStorage[category] === undefined) ?  {} : dataFromStorage[category]
      data[category] = (data[category] === undefined) ? {} : data[category]
      Object.assign(dataFromStorage[category], data[category])
    })
    return dataFromStorage
  }
}
