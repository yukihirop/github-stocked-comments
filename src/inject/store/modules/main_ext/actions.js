'use strict'

import StockedComment from '@/apis/github/StockedComment'

export default {
  deleteCommentDataById({ dispatch }, params) {
    let id = params.id
    let type = params.type
    let api = new StockedComment(null, { type: type })
    api.deleteData(id, (error, _) => {
      if(error) throw error
    })
  }
}