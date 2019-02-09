'use strict'

import IssueComment from '@/inject/models/main_content/main_li/IssueComment'

export default {
  isValid (issueComment) {
    return (issueComment instanceof IssueComment)
  }
}
