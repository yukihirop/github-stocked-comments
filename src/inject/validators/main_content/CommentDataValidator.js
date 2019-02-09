'use strict'

export default {
  isValid (meta) {
    return meta.repoUserName !== 'undefined' &&
           meta.repoName !== 'undefined' &&
           meta.issueId !== 'undefined' &&
           meta.type !== 'undefined' &&
           meta.commentId !== 'undefined' &&
           meta.copyLinkURL !== 'undefined' &&
           meta.apiURL !== 'undefined'
  }
}
