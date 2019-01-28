'use strict'

export default class Header {
  constructor () {
    this.$head = $('head')
    this.$headerUl = $('header nav ul')
  }

  attachStockedCommentsLink () {
    this.$headerUl.append(this.stockedCommentsLinkLi())
  }

  loadStyleSheet () {
    this.$head.append($('<link>', {
      rel: 'stylesheet',
      href: chrome.extension.getURL('css/github-style.css')
    }))
  }

  // private
  stockedCommentsLinkLi () {
    return '<li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="#Stocked_Comments">&thinsp;Stocked Comments</a></li>'
  }
}
