'use strict'

import * as types from '@/inject/store/mutation-types'

export var createPaginatePlugin = () => {
  return store => {
    store.subscribe((mutation, state) => {
      let pager = state.pager
      let data = state.currentCommentData
      let canPrevPage = state.canPrevPage
      let canNextPage = state.canNextPage
      let totalPageCount = state.totalPageCount

      switch (mutation.type) {
        case types.FETCH_COMMENT_DATA:
          data = pager.resetPage(state.commentData)
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()
          totalPageCount = pager.totalPageCount()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage, totalPageCount: totalPageCount })
          break
        case types.SEARCH_COMMENT_DATA:
          data = pager.resetPage(state.currentCommentData)
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()
          totalPageCount = pager.totalPageCount()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage, totalPageCount: totalPageCount })
          state.eventHub.$emit('build-page')
          break
        case types.PREV_PAGE:
          data = pager.prev()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()
          totalPageCount = pager.totalPageCount()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage, totalPageCount: totalPageCount })
          break
        case types.NEXT_PAGE:
          data = pager.next()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()
          totalPageCount = pager.totalPageCount()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage, totalPageCount: totalPageCount })
          break
        case types.PAGE:
          data = pager.page(state.currentPageNum)
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()
          totalPageCount = pager.totalPageCount()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage, totalPageCount: totalPageCount })
      }

      state.eventHub.$emit('text-highlight', state.searchText)
    })
  }
}
