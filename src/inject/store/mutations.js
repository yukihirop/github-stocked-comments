'use strict'

import Vue from 'vue'
import * as types from './mutation-types'

var ObjectToArray

export default {
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
