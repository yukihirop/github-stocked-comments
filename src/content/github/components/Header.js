'use strict'

import LoginUserInfo from '@/apis/github/LoginUserInfo'

export default class Header {
  constructor () {
    this.$head = $('head')
    this.$headerUl = $('header nav ul')
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
    return '<li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="#Stocked_Comments">&thinsp;Stocked Comments</a></li>'
  }
}
