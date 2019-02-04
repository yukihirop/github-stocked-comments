'use strict'

import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'

export default {
  [actionTypes.prev]: ({ commit, state }) => {
    if (state.pager.hasPrev()) commit(mutationTypes.PREV)
  },
  [actionTypes.next]: ({ commit, state }) => {
    if (state.pager.hasNext()) commit(mutationTypes.NEXT)
  },
  [actionTypes.page]: ({ commit }, pageNum) => {
    commit(mutationTypes.PAGE, { currentPageNum: pageNum })
  },
  [actionTypes.resetPage]: ({ commit }, data) => {
    commit(mutationTypes.RESET_PAGE, { data: data })
  }
}
