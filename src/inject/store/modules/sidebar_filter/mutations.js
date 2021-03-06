import * as types from './mutation-types'

export default {
  [types.INITIALIZE_FILTER_LIST] (state, payload) {
    state.allCommentData = payload.data.allCommentData
    state.loginUserCommentData = payload.data.loginUserCommentData
    state.otherUserCommentData = payload.data.otherUserCommentData
    state.filteredCommentData = payload.data.allCommentData
  },
  [types.INITIALIZE_LANGUAGE_FILTER_LIST] (state, payload) {
    state.languageList = payload.data
     if (Object.keys(state.languageList).length !== 0){
      state.displayFilterListByLanguages = true
     }
  },
  [types.FILTER_TO_ALL_COMMENT_DATA] (state, payload) {
    state.allCommentData = payload.data
    state.filteredCommentData = payload.data
  },
  [types.FILTER_TO_LOGIN_USER_COMMENT_DATA] (state, payload) {
    state.loginUserCommentData = payload.data
    state.filteredCommentData = payload.data
  },
  [types.FILTER_TO_OTHER_USER_COMMENT_DATA] (state, payload, rootState) {
    state.otherUserCommentData = payload.data
    state.filteredCommentData = payload.data
  },
  [types.GET_TIED_LANGUAGE_TAG_COMMENT_DATA] (state, payload) {
    state.selectedLanguage = payload.language
  },
  [types.GET_ALL_FILTERED_COMMENT_DATA] (state) {
    state.selectedLanguage = ''
  }
}