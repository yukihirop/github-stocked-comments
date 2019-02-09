'use strict'

import Base from './Base'
import Issue from '@/content/github/models/Issue'
import IssueComment from '@/content/github/models/IssueComment'

export default class StockedComment extends Base {
  constructor (params) {
    super(params)
    if (params.type === 'issue') {
      this.baseModel = new Issue(params)
    } else if (params.type === 'issuecomment') {
      this.baseModel = new IssueComment(params)
    }
  }
}
