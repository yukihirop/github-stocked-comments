'use strict'

import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload.data
    state.currentCommentData = payload.data
    state.loading = true
  },
  [types.SEARCH_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload.data
    state.searchText = payload.searchText
  },
  [types.ALL_COMMENT_DATA] (state, payload) {
    state.currentCommentData = state.commentData
  }
}
