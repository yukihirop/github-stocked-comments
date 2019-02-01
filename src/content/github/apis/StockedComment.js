'use strict'

import Issue from '@/content/github/apis/Issue'
import IssueComment from '@/content/github/apis/IssueComment'

export default class StockedComment {
  constructor (params) {
    if (params.type === 'issue') {
      return new Issue(params)
    } else if (params.type === 'issuecomment') {
      return new IssueComment(params)
    }
  }
}
