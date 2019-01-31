'use strict'

import Issue from '@/inject/apis/main_content/main_li/Issue'
import IssueComment from '@/inject/apis/main_content/main_li/IssueComment'

export default class MainLi {
  constructor (metaData) {
    this.metaData = metaData
  }

  issue () {
    return new Issue(this.metaData)
  }

  issueComment () {
    return new IssueComment(this.metaData)
  }

  isIssue () {
    return this.metaData.type === 'issue'
  }

  isIssueComment () {
    return this.metaData.type === 'issuecomment'
  }
}
