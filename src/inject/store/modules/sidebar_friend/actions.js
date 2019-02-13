import * as types from './mutation-types'
import LoginUserInfo from '@/apis/github/LoginUserInfo'

export default {
  fetchLoginUserData({ state, commit }){
    return new Promise((resolve, reject) => {
      let api = new LoginUserInfo()

      api.fetchData((error, payload) => {
        if (error) throw error
        commit(types.FETCH_LOGIN_USER_DATA, { data: payload })
        resolve()
      })
    })
  }
}