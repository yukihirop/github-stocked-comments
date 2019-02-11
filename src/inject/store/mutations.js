'use strict'

import * as types from './mutation-types'

export default {
  [types.UPDATE_CURRENT_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload.data
  },
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload.data
    state.currentCommentData = payload.data
    state.loading = true
  },
  [types.SEARCH_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload.data
    state.searchText = payload.searchText
  }
}
