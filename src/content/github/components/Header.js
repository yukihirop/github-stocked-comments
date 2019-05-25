'use strict'

import LoginUserInfo from '@/apis/github/LoginUserInfo'

export default class Header {
  constructor () {
    this.$head = $('head')
    this.$headerUl = $('header nav')
    this.loginUserName = $('details-menu[role=menu]').find('a:contains("Signed in as")').children().text()
    this.isAfterSignIn = this.checkAfterSignIn()
  }

  attachStockedCommentsLink () {
    this.$headerUl.append(this.stockedCommentsLinkLi())
  }

  saveLoginUserName(){
    let params = { userName: this.loginUserName }
    let api = new LoginUserInfo(null, params)

    api.saveData((error, isSave) => {
      if (error) throw error
      if (isSave) console.log('Save data success')
    })
  }

  loadStyleSheet(){
    let $head = this.$head

    $head.append($("<link>", {
      rel: "stylesheet",
      href: chrome.extension.getURL("../assets/css/popover.css")
    }))
  }

  // private
  checkAfterSignIn(){
    return !($("a[href='/join?source=header-home']").length > 0 || $("a[href='/join?source=header']").length > 0)
  }

  // private
  stockedCommentsLinkLi () {
    return '<a class="js-selected-navigation-item Header-link mr-3" href="#Stocked_Comments">&thinsp;Stocked Comments</a>'
  }
}
