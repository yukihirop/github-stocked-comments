'use strict'

import Issue from '@/inject/models/main_content/main_li/Issue'

export default {
  isValid (issue) {
    return (issue instanceof Issue)
  }
}
