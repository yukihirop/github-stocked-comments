import * as types from './mutation-types'

export default {
  [types.FETCH_LOGIN_USER_DATA](state, payload){
    let loginUserData = payload.data[0]
    state.loginUserName = loginUserData.userName
    state.followingsData = loginUserData.followings[0].data
  },
}