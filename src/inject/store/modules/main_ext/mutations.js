'use strict'

import * as types from './mutation-types'

export default {
  [types.SHOW_DELETE_MODAL] (state, payload) {
    state.isShowDeleteModal = true
    state.deleteModalParams = payload
  },
  [types.CLOSE_DELETE_MODAL] (state) {
    state.isShowDeleteModal = false
    state.deleteModalParams = {}
  }
}