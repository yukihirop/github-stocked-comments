'use strict'

import Base from '@/content/github/apis/Base'

export default class Issue extends Base {
  constructor (params) {
    super(params)
    this.issueId = params.issueId
  }

  // private
  dataFromOctokit () {
    return this.authClient.issues.get({
      owner: `${this.repoUserName}`,
      repo: `${this.repoName}`,
      number: `${Number(this.issueId)}`
    })
  }
}
