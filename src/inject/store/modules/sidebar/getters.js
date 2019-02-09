'use strict'

export const allCommentsCount = (state, getters, rootState ) => {
  return rootState.commentData.length
}