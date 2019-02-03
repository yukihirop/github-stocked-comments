'use strict'

import * as types from './mutation-types'

export default {
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload
    state.currentCommentData = payload
    state.loading = true
  },
  [types.SEARCH_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload
  }
}
