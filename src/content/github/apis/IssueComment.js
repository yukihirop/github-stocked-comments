'use strict'

import Base from '@/content/github/apis/Base'

export default class IssueComment extends Base {
  constructor (params) {
    super(params)
    this.commentId = params.commentId
  }

  // private
  dataFromOctokit () {
    return this.authClient.issues.getComment({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      comment_id: `${Number(this.commentId)}`
    })
  }
}
