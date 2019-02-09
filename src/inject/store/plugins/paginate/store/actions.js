'use strict'

import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'

export default {
  [actionTypes.prev]: ({ commit, state }) => {
    if (state.pager.hasPrev()) commit(mutationTypes.PREV)
    if (state.overrideResource) state.paginate._overrideResourceAction()
  },
  [actionTypes.next]: ({ commit, state }) => {
    if (state.pager.hasNext()) commit(mutationTypes.NEXT)
    if (state.overrideResource) state.paginate._overrideResourceAction()
  },
  [actionTypes.page]: ({ commit }, payload) => {
    const state = payload.innerModuleState
    const pageNum = payload.pageNum

    commit(mutationTypes.PAGE, { currentPageNum: pageNum })
    if (state.overrideResource) state.paginate._overrideResourceAction()
  },
  [actionTypes.resetPage]: ({ commit }, payload) => {
    const state = payload.innerModuleState
    const data = payload.data

    commit(mutationTypes.RESET_PAGE, { data: data })
    if (state.overrideResource) state.paginate._overrideResourceAction()
  },
  [actionTypes._overrideResource]: ({ commit }, payload) => {
    if(payload.overrideResource) commit(mutationTypes.OVERRIDE_RESOURCE, { payload })
  }
}
