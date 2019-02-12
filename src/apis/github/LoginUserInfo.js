'use strict'

import BaseApi from './BaseApi'
import LoginUser from '@/models/github/LoginUser'

export default class LoginUserInfo extends BaseApi {
  constructor(){
    super()
    this.baseModel = new LoginUser()
  }
}