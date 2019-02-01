import * as types from './mutation-types'
import storage from '@/ext/storage'

const namespaced = true

const state = {
  commentData: {}
}

const getters = {
  allCommentData: state => {
    return state.commentData
  }
}

const actions = {
  fetchDataFromStorage ({ commit }) {
    storage.fetchCommentData().then((data) => {
      commit(types.FETCH_COMMENT_DATA, data)
    })
  }
}

const mutations = {
  [types.FETCH_COMMENT_DATA] (state, payload) {
    state.commentData = payload
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
