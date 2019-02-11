import * as types from './mutation-types'

export default {
  [types.FETCH_LOGIN_USER_DATA](state, payload){
    let loginUserData = payload.data[0]
    state.loginUserName = loginUserData.userName
  },
  [types.INITIALIZE_FILTER_LIST] (state, payload) {
    state.allCommentData = payload.data.allCommentData
    state.loginUserCommentData = payload.data.loginUserCommentData
    state.otherUserCommentData = payload.data.otherUserCommentData
  },
  [types.FILTER_TO_ALL_COMMENT_DATA] (state, payload) {
    state.allCommentData = payload.data
  },
  [types.FILTER_TO_LOGIN_USER_COMMENT_DATA] (state, payload) {
    state.loginUserCommentData = payload.data
  },
  [types.FILTER_TO_OTHER_USER_COMMENT_DATA] (state, payload, rootState) {
    state.otherUserCommentData = payload.data
  }
}