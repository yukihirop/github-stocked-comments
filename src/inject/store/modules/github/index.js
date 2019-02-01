import * as types from './mutation-types'
import MainLi from '@/inject/apis/main_content/MainLi'

const namespaced = true

const state = {
  commentData: [],
  loading: false
}

const getters = {
  allCommentData: state => {
    return state.commentData
  }
}

const actions = {
  fetchDataFromStorage ({ commit }) {
    let api = new MainLi()
    api.fetchCommentData((error, payload) => {
      if (error) throw error
      commit(types.FETCH_COMMENT_DATA, payload)
    })
  }
}

const mutations = {
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload
    state.loading = true
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
