import * as types from './mutation-types'
import LoginUserInfo from '@/apis/github/LoginUserInfo'
import LoginUser from '@/models/github/LoginUser'

export default {
  fetchLoginUserData({ commit, state }){
    let api = new LoginUserInfo()
    let login_user = new LoginUser()
    api.fetchData([login_user],(error, payload) => {
      if (error) throw error
      console.log("fetchLoginUserData")
      console.log(payload)
      commit(types.FETCH_LOGIN_USER_DATA, { data: payload })
    })
  }
}