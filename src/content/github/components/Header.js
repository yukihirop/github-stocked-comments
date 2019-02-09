'use strict'

export default class Header {
  constructor () {
    this.$head = $('head')
    this.$headerUl = $('header nav ul')
  }

  attachStockedCommentsLink () {
    this.$headerUl.append(this.stockedCommentsLinkLi())
  }

  // private
  stockedCommentsLinkLi () {
    return '<li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="#Stocked_Comments">&thinsp;Stocked Comments</a></li>'
  }
}
