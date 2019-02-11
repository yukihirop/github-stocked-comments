'use strict'

export const allCommentsCount = (state, getters, rootState ) => {
  return state.allCommentData.length
}

export const loginUserCommentsCount = (state, getters, rootState) => {
  return state.loginUserCommentData.length
}

export const otherUserCommentsCount = (state, getters, rootState) => {
  return state.otherUserCommentData.length
}