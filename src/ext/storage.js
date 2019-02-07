'use strict'

var convertFromResourceToStorageKey = resourceName => {
  let result = ''
  let data = {
    'issue':         'github-stocked-comments.github.issue',
    'issuecomment':  'github-stocked-comments.github.issuecomment',
    'repo_language': 'github-stocked-comments.github.repo_language',
    'liked':         'github-stocked-comments.extension.liked'
  }

  if (data[resourceName] === 'undefined'){
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
*
*/
export default class Storage {
  constructor(resourceName){
    this.storageKey = convertFromResourceToStorageKey(resourceName)
    this.storage = chrome.storage.local
  }

  onChangeData (callback) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      callback(changes, namespace)
    })
  }

  saveData(data, relationshipResourcesData = {}){
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
    }).then((saveData) => {
      return new Promise((resolve, reject) => {
        Object.keys(relationshipResourcesData).forEach(resourceName => {
          let data = relationshipResourcesData[resourceName]
          let relationshipStorage = new RelationshipStorage(resourceName)

          relationshipStorage.saveData(data)
          setTimeout(()=>{}, 300)
        })

        resolve(saveData)
      })
    })
  }

  fetchData (relationshipResources = []) {
    return new Promise((resolve, reject) => {
      this.storage.get(this.storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          let datadontExist = Object.keys(result).length === 0
          if(datadontExist) {
            setTimeout(() => { return resolve(result) }, 100)
          } else {
            let dataFromStorage = JSON.parse(result[this.storageKey])
            let data = this.mergeRelationshipResources(relationshipResources, dataFromStorage)
            setTimeout(() => { return resolve(data) }, 100)
          }
        }
      })
    })
  }

  // private
  mergeRelationshipResources(relationshipResources, dataFromStorage){
    let result = Object.keys(dataFromStorage).reduce((base, key) => {
      let value = dataFromStorage[key]
      let relationships = {}

      relationshipResources.forEach(resourceName => {
        let relationshipStorage = new RelationshipStorage(resourceName)
        let foreignKey = value[resourceName + '_id']

        relationshipStorage.fetchData(foreignKey).then(result => {
          relationships[resourceName] = result
        })

        dataFromStorage[key]['relationships'] = (dataFromStorage[key]['relationships'] === undefined) ? {} : dataFromStorage[key]['relationships']
        dataFromStorage[key]['relationships'] = relationships
      })

      Object.assign(base, dataFromStorage)

      return base
    },{})
    return result
  }
}

//private
class RelationshipStorage {
  constructor(resourceName){
    this.storageKey = convertFromResourceToStorageKey(resourceName)
    this.storage = chrome.storage.local
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

  fetchData (id) {
    return new Promise((resolve, reject) => {
      this.storage.get(this.storageKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(JSON.parse(result[this.storageKey])[id])
        }
      })
    })
  }
}