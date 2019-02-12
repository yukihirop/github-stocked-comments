import * as types from './mutation-types'

export default {
  [types.FETCH_LOGIN_USER_DATA](state, payload){
    let loginUserData = payload.data[0]
    state.loginUserName = loginUserData.userName
    // limit 30
    state.followingsData = loginUserData.followings[0].data.slice(0,30)
    if (Object.keys(state.followingsData).length !== 0){
      state.displayJumpToaFriend = true
     }
  },
}