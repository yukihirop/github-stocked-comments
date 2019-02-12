import actions from './actions'
import mutations from './mutations'

const initialState = {
  loginUserName: '',
  followingsData: []
}

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations
}