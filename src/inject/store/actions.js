'use strict'

import * as types from './mutation-types'
import StockedComment from '@/apis/github/StockedComment'

export default {
  updateCurrentCommentData({ commit, state }, payload) {
    commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: payload })
  },
  initialize({ commit, dispatch, state, rootState }) {
    let promises = [dispatch('fetchDataFromStorage'), dispatch('sidebar_friend/fetchLoginUserData')]
    Promise.all(promises).then(() => {
      dispatch('sortRecentlyStockedComments')
      dispatch('sidebar_filter/initializeFilterList')
      dispatch('sidebar_filter/initializeLanguageFilterList')
      let language = rootState.sidebar_filter.selectedLanguage
      if (language !== '') {
        dispatch('sidebar_filter/getTiedLanguageTagCommentData', language)
      }
    })
  },
  fetchDataFromStorage ({ commit, state }) {
    return new Promise((resolve, reject) => {
      let api = new StockedComment()
      api.fetchData((error, payload) => {
        if (error) throw error
        commit(types.FETCH_COMMENT_DATA, { data: payload.reverse() })
        resolve()
      })
    })
  },
  searchCommentData ({ commit, state }, text) {
    let data = state.commentData.filter(comment => {
      return comment.body.toLowerCase().includes(text.toLowerCase())
    })
    commit(types.SEARCH_COMMENT_DATA, { data: data, searchText: text })
  },
  sortRecentlyStockedComments({ commit, state }) {
    let sortData = state.commentData.sort((a, b) => {
      if(a.stockedAt < b.stockedAt) return 1
      if(a.stockedAt > b.stockedAt) return -1
      return 0
    })
    commit(types.FETCH_COMMENT_DATA, { data: sortData })
  },
  sortRecentlyPostedComments({ commit, state }) {
    let sortData = state.commentData.sort((a, b) => {
      if(a.createdAt < b.createdAt) return 1
      if(a.createdAt > b.createdAt) return -1
      return 0
    })
    commit(types.FETCH_COMMENT_DATA, { data: sortData })
  },
  sortLongestBodyComments({ commit, state}) {
    let sortData = state.commentData.sort((a, b) => {
      if(a.body.length < b.body.length) return 1
      if(a.body.length > b.body.length) return -1
      return 0
    })
    commit(types.FETCH_COMMENT_DATA, { data: sortData })
  }
}
