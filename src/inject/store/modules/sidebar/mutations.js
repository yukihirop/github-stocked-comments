import * as types from './mutation-types'

export default {
  [types.FETCH_LOGIN_USER_DATA](state, payload){
    let userData = payload.data
    state.userName = userData.data.login
    state.followingAvatarURLList = payload.data.followingAvatarURLList
  }
}