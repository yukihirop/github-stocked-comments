import * as types from './mutation-types'

const createLoginUserCommentData = (state, rootState) => {
  return rootState.commentData.filter(comment => {
    return comment.repoUserName === rootState.sidebar_friend.loginUserName
  })
}

const createOtherUserCommentData = (state, rootState) => {
  return rootState.commentData.filter(comment => {
    return comment.repoUserName !== rootState.sidebar_friend.loginUserName
  })
}

const createLanguageList = (state, rootState) => {
  let languages = rootState.commentData.map(comment => { return comment.repo_language[0].mainLanguage })
  return languages.reduce((base, language) => {
    if (base[language]) {
      base[language]++
    } else {
      base[language] = 1
    }
    return base
  },{})
}

const createTiedLanguageTagCommentData = (state, language) => {
  return state.filteredCommentData.filter(comment => {
    return comment.repo_language[0].mainLanguage === language
  })
}

export default {
  initializeFilterList({ state, commit, rootState }) {
    let allCommentData = rootState.commentData
    let loginUserCommentData = createLoginUserCommentData(state, rootState)
    let otherUserCommentData = createOtherUserCommentData(state, rootState)
    let payload = { allCommentData: allCommentData, loginUserCommentData: loginUserCommentData, otherUserCommentData: otherUserCommentData }
    commit(types.INITIALIZE_FILTER_LIST, { data: payload })
  },
  initializeLanguageFilterList({ state, commit, rootState }){
    let payload = createLanguageList(state, rootState)
    commit(types.INITIALIZE_LANGUAGE_FILTER_LIST, { data: payload })
  },
  filterToAllCommentData({ commit, dispatch, rootState }) {
    let payload = rootState.commentData
    commit(types.FILTER_TO_ALL_COMMENT_DATA, { data: payload })
    dispatch('updateCurrentCommentData', payload, { root: true })
  },
  filterToLoginUserCommentData({ state, commit, dispatch, rootState }) {
    let payload = createLoginUserCommentData(state, rootState)
    commit(types.FILTER_TO_LOGIN_USER_COMMENT_DATA, { data: payload })
    dispatch('updateCurrentCommentData', payload, { root: true })
  },
  filterToOtherUserCommentData({ state, commit, dispatch, rootState }) {
    let payload = createOtherUserCommentData(state, rootState)
    commit(types.FILTER_TO_OTHER_USER_COMMENT_DATA, { data: payload })
    dispatch('updateCurrentCommentData', payload, { root: true })
  },
  getTiedLanguageTagCommentData({ state, dispatch }, language) {
    let payload = createTiedLanguageTagCommentData(state, language)
    dispatch('updateCurrentCommentData', payload, { root: true })
  },
  getAllFilteredCommentData({ state, dispatch }) {
    let payload = state.filteredCommentData
    dispatch('updateCurrentCommentData', payload, { root: true})
  }
}