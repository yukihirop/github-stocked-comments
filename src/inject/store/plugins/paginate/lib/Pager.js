// http://nekotheshadow.hatenablog.com/entry/2015/04/01/161343
/* eslint-disable no-extend-native */
Array.prototype.divide = function (n) {
  var ary = this
  var idx = 0
  var results = []
  var length = ary.length

  while (idx + n < length) {
    var result = ary.slice(idx, idx + n)
    results.push(result)
    idx = idx + n
  }

  var rest = ary.slice(idx, length + 1)
  results.push(rest)
  return results
}
/* eslint-enable no-extend-native */

export default class Pager {
  constructor (data, perPage) {
    this.data = data
    this.perPage = perPage
    this.currentPageIndex = 0
  }

  page (pageNum) {
    this.currentPageIndex = pageNum - 1
    return this.dataDividedByPage()[pageNum - 1]
  }

  currentPage () {
    return this.page(this.currentPageIndex + 1)
  }

  isCurrent (pageNum) {
    return (this.currentPageIndex + 1) === pageNum
  }

  get pageNum () {
    return this.currentPageIndex + 1
  }

  next () {
    let result = []
    if (this.hasNext()) {
      result = this.dataDividedByPage()[this.currentPageIndex + 1]
    } else {
      return []
    }
    this.currentPageIndex++
    return result
  }

  prev () {
    let result = []
    if (this.hasPrev()) {
      result = this.dataDividedByPage()[this.currentPageIndex - 1]
    } else {
      return []
    }
    this.currentPageIndex--
    return result
  }

  resetPage (resetData) {
    this.data = resetData
    return this.page(1)
  }

  hasNext () {
    return this.currentPageIndex < this.totalPageCount() - 1
  }

  hasPrev () {
    return this.currentPageIndex > 0
  }

  totalPageCount () {
    return this.dataDividedByPage().length
  }

  // private
  dataDividedByPage () {
    return this.data.divide(this.perPage)
  }
}
/* eslint-enable no-unused-expressions */
