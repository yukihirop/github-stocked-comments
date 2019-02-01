'use strict'

import * as types from './mutation-types'
import MainLi from '@/inject/apis/main_content/MainLi'

export default {
  fetchDataFromStorage ({ commit }) {
    let api = new MainLi()
    api.fetchCommentData((error, payload) => {
      if (error) throw error
      commit(types.FETCH_COMMENT_DATA, payload)
    })
  }
}
