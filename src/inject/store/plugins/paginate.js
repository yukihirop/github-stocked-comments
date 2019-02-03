'use strict'

import * as types from '@/inject/store/mutation-types'

export var createPaginatePlugin = (pager) => {
  return store => {
    store.subscribe((mutation, state) => {
      let data = []
      let canPrevPage = state.canPrevPage
      let canNextPage = state.canNextPage

      switch (mutation.type) {
        case types.FETCH_COMMENT_DATA:
          data = pager.resetPage(state.commentData)
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
          break
        case types.SEARCH_COMMENT_DATA:
          data = pager.resetPage(state.currentCommentData)
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
          break
        case types.PREV_PAGE:
          data = pager.prev()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
          break
        case types.NEXT_PAGE:
          data = pager.next()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
          break
      }

      state.eventHub.$emit('text-highlight', state.searchText)
    })
  }
}
