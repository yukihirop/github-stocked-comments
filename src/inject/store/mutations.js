'use strict'

import * as types from './mutation-types'

export default {
  [types.UPDATE_CURRENT_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload.data
    state.canPrevPage = payload.canPrevPage
    state.canNextPage = payload.canNextPage
    state.totalPageCount = payload.totalPageCount
  },
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload.data
    state.loading = true
  },
  [types.SEARCH_COMMENT_DATA] (state, payload) {
    state.currentCommentData = payload.data
    state.searchText = payload.searchText
  },
  [types.PREV_PAGE] (state, payload) {
    state.currentPageNum = payload.currentPageNum
  },
  [types.NEXT_PAGE] (state, payload) {
    state.currentPageNum = payload.currentPageNum
  },
  [types.PAGE] (state, payload) {
    state.currentPageNum = payload.currentPageNum
  }
}
