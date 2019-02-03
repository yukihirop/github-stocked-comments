'use strict'

import * as types from '@/inject/store/mutation-types'

export var createPaginatePlugin = (pager) => {
  return store => {
    store.subscribe((mutation, state) => {
      let data = []
      let canPrevPage = state.canPrevPage
      let canNextPage = state.canNextPage

      if (isFetchOrSearch(mutation)) {
        data = pager.resetPage(state.commentData)
        canPrevPage = pager.hasPrev()
        canNextPage = pager.hasNext()

        store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
      } else if (isPrevPage(mutation)) {
        if (pager.hasPrev()) {
          data = pager.prev()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
        }
      } else if (isNextPage(mutation)) {
        if (pager.hasNext()) {
          data = pager.next()
          canPrevPage = pager.hasPrev()
          canNextPage = pager.hasNext()

          store.commit(types.UPDATE_CURRENT_COMMENT_DATA, { data: data, canPrevPage: canPrevPage, canNextPage: canNextPage })
        }
      }
    })
  }
}

var isFetchOrSearch = (mutation) => {
  return mutation.type === types.FETCH_COMMENT_DATA ||
         mutation.type === types.SEARCH_COMMENT_DATA
}

var isPrevPage = (mutation) => {
  return mutation.type === types.PREV_PAGE
}

var isNextPage = (mutation) => {
  return mutation.type === types.NEXT_PAGE
}
