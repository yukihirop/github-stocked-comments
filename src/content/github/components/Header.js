'use strict'

import LoginUserInfo from '@/apis/github/LoginUserInfo'

export default class Header {
  constructor () {
    this.$head = $('head')
    this.$headerUl = $('header nav ul')
    this.loginUserName = $('details-menu[role=menu]').find('a:contains("Signed in as")').children().text()
  }

  attachStockedCommentsLink () {
    this.$headerUl.append(this.stockedCommentsLinkLi())
  }

  saveLoginUserName(){
    let params = { userName: this.loginUserName }
    let user = new LoginUserInfo()
    user.saveData(params, (error, isSave) => {
      if (error) throw error
      if (isSave) console.log('Save data success')
    })
  }

  // private
  stockedCommentsLinkLi () {
    return '<li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="#Stocked_Comments">&thinsp;Stocked Comments</a></li>'
  }
}
