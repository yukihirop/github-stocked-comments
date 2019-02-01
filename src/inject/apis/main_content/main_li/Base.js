'use strict'

import Octokit from '@octokit/rest'
import storage from '@/ext/storage'

export default class Base {
  constructor (id, meta) {
    this.id = id
    this.repoUserName = meta.repoUserName
    this.repoName = meta.repoName
    this.issueId = meta.issueId
    this.type = meta.type
    this.commentId = meta.commentId
    this.copyLinkURL = meta.copyLinkURL
    this.apiURL = meta.apiURL
    this.cache = meta.cache
    this.octokit = new Octokit()
  }

  fetchData (callback) {
    if (this.cache) {
      this.fetchDataFromStorage(callback)
    } else {
      this.fetchDataFromGitHub(callback)
    }
  }

  // private
  // https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918
  fetchDataFromStorage (callback) {
    storage.fetchCommentData()
      .then((data) => {
        let commentMetaData = data[this.id]
        this.setProperties(commentMetaData)
        setTimeout(_ => callback(null, true))
      })
      .catch((error) => {
        setTimeout(_ => callback(error))
      })
  }

  // private
  fetchDataFromGitHub (callback) {
    let error = new Error('Override in extends class')
    throw error
  }

  // private
  setProperties (issueData, callback = () => {}) {
    let error = new Error('Override in extends class')
    throw error
  }
}
