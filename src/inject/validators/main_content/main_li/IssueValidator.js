'use strict'

import Issue from '@/inject/apis/main_content/main_li/Issue'

export default {
  isValid (issue) {
    return (issue instanceof Issue)
  }
}
