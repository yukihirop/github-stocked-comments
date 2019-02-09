'use strict'

import Base from './Base'
import LoginUser from '@/content/github/models/LoginUser'

export default class LoginUserInfo extends Base {
  constructor(params){
    super(params)
    this.baseModel = new LoginUser(params)
  }
}