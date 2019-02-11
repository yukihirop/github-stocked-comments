'use strict'

import * as rootTypes from '@/inject/store/mutation-types'

export const paginateCallback = (store, paginate) => {
  store.subscribe((mutation, state) => {
    switch(mutation.type){
      case rootTypes.UPDATE_CURRENT_COMMENT_DATA:
      case rootTypes.FETCH_COMMENT_DATA:
      case rootTypes.SEARCH_COMMENT_DATA:
        paginate.resetPage(state.currentCommentData)
        state.eventHub.$emit('build-page')
        break
    }

    state.eventHub.$emit('text-highlight', state.searchText)
  })
}