import * as types from './mutation-types'
import LoginUserInfo from '@/apis/github/LoginUserInfo'
import LoginUser from '@/models/github/LoginUser'

export default {
  fetchLoginUserData({ state, commit }){
    return new Promise((resolve, reject) => {
      let api = new LoginUserInfo()
      let login_user = new LoginUser()
      api.fetchData([login_user],(error, payload) => {
        if (error) throw error
        commit(types.FETCH_LOGIN_USER_DATA, { data: payload })
        resolve()
      })
    })
  }
}