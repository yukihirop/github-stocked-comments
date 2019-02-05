'use strict'

import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.PREV]: (state) => {
    let pager = state.pager
    state.pageData = pager.prev()
  },
  [mutationTypes.NEXT]: (state) => {
    let pager = state.pager
    state.pageData = pager.next()
  },
  [mutationTypes.PAGE]: (state, payload) => {
    let pager = state.pager
    let pageNum = payload.currentPageNum
    state.pageData = pager.page(pageNum)
  },
  [mutationTypes.RESET_PAGE]: (state, payload) => {
    let pager = state.pager
    let data = payload.data
    state.pageData = pager.resetPage(data)
  },
  [mutationTypes.OVERRIDE_RESOURCE]: (state, { payload }) => {
    payload.rootState[payload.resourceName] = payload.pageData
  }
}
