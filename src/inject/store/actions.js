'use strict'

import * as types from './mutation-types'
import StockedComment from '@/apis/github/StockedComment'
import Issue from '@/models/github/Issue'
import IssueComment from '@/models/github/IssueComment'

export default {
  fetchDataFromStorage ({ commit, state }) {
    let api = new StockedComment()
    let issue = new Issue()
    let issuecomment = new IssueComment()
    api.fetchData([issuecomment, issue], (error, payload) => {
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
  allCommentData ({ commit, state }) {
    commit(types.ALL_COMMENT_DATA)
  },
  sortRecentlyComments({ commit, state }) {
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
