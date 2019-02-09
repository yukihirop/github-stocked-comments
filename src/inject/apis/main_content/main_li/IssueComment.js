'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class IssueComment extends Base {
  get name(){
    return 'issuecomment'
  }

  get relationships(){
    return [this.repoLanguage]
  }

  // private
  get repoLanguage(){
    return new RepoLanguage()
  }
}
