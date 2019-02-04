'use strict'

import * as types from './mutation-types'
import MainLi from '@/inject/apis/main_content/MainLi'

export default {
  fetchDataFromStorage ({ commit, state }) {
    let api = new MainLi()
    api.fetchCommentData((error, payload) => {
      if (error) throw error
      commit(types.FETCH_COMMENT_DATA, { data: payload })
    })
  },
  searchCommentData ({ commit, state }, text) {
    let data = state.commentData.filter(comment => {
      return comment.body.toLowerCase().includes(text.toLowerCase())
    })
    commit(types.SEARCH_COMMENT_DATA, { data: data, searchText: text })
  },
  prevPage ({ commit, state }) {
    if (state.pager.hasPrev()) commit(types.PREV_PAGE, { currentPageNum: state.currentPageNum - 1 })
  },
  nextPage ({ commit, state }) {
    if (state.pager.hasNext()) commit(types.NEXT_PAGE, { currentPageNum: state.currentPageNum + 1 })
  },
  page ({ commit }, pageNum) {
    commit(types.PAGE, { currentPageNum: pageNum })
  }
}
