'use strict'

import Base from './Base'
import RepoLanguage from './RepoLanguage'

export default class Issue extends Base {
  get name(){
    return 'issue'
  }

  get relationships(){
    return [this.repoLanguage]
  }

  // private
  get repoLanguage(){
    return new RepoLanguage()
  }
}
