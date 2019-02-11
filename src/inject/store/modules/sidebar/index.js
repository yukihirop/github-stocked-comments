import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

const initialState = {
  loginUserName: '',
  allCommentData: [],
  loginUserCommentData: [],
  otherUserCommentData: []
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}