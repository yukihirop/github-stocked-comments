'use strict'

import * as types from './mutation-types'
import StockedComment from '@/apis/github/StockedComment'

export default {
  showDeleteModal({ commit }, params) {
    commit(types.SHOW_DELETE_MODAL, params)
  },
  closeDeleteModal({ commit }) {
    commit(types.CLOSE_DELETE_MODAL)
  },
  deleteCommentDataById({ dispatch }, params) {
    let id = params.id
    let type = params.type
    let api = new StockedComment(null, { type: type })
    api.deleteData(id, (error, _) => {
      if(error) throw error
    })
  }
}