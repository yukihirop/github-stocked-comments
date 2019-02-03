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
  prevPage ({ commit }) {
    commit(types.PREV_PAGE)
  },
  nextPage ({ commit }) {
    commit(types.NEXT_PAGE)
  }
}
