import actions from './actions'
import mutations from './mutations'

const initialState = {
  isShowDeleteModal: false,
  deleteModalParams: {}
}

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations
}