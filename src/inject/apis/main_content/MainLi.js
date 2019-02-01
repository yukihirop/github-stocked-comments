'use strict'

import Issue from '@/inject/apis/main_content/main_li/Issue'
import IssueComment from '@/inject/apis/main_content/main_li/IssueComment'

export default class MainLi {
  constructor (id, data) {
    this.id = id
    this.data = data
  }

  issue () {
    return new Issue(this.id, this.data)
  }

  issueComment () {
    return new IssueComment(this.id, this.data)
  }

  isIssue () {
    console.log('MainLi#isIssue')
    console.log(this.data)
    return this.data.type === 'issue'
  }

  isIssueComment () {
    return this.data.type === 'issuecomment'
  }
}
