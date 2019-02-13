'use strict'

export default class IssueCommentModel {
  constructor(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }

  get mainLanguage(){
    let mainLanguage = this.repo_language[0].mainLanguage
    return (mainLanguage === undefined) ? '' : mainLanguage
  }
}