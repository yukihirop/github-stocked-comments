import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

const initialState = {
  allCommentData: [],
  loginUserCommentData: [],
  otherUserCommentData: [],
  filteredCommentData: [],
  languageList: {}
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}