'use strict'

import * as types from '@/inject/store/mutation-types'

export const paginateCallback = (store, paginate) => {
  store.subscribe((mutation, state) => {

    switch(mutation.type){
      case types.FETCH_COMMENT_DATA:
      case types.SEARCH_COMMENT_DATA:
        paginate.resetPage(state.currentCommentData)
        state.eventHub.$emit('build-page')
        break
    }

    state.eventHub.$emit('text-highlight', state.searchText)
  })
}