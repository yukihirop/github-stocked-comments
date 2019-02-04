<template>
  <div class="paginate-container">
    <div class="pagination">
      <a :class="isPrevDisabled()" @click="prevPage()">Previous</a>
      <a v-for="n in prevSideDisplayPageNum" :class="isCurrent(n)" @click="page(n)">{{ n }}</a>
      <a v-if="betweenDisableButton" class="disabled">...</a>
      <a :class="isCurrent(nextSideDisplayPageNum - 1)" v-if="displaynextSideButton" @click="page(nextSideDisplayPageNum - 1)">{{ nextSideDisplayPageNum - 1 }}</a>
      <a :class="isCurrent(nextSideDisplayPageNum)" v-if="displaynextSideButton" @click="page(nextSideDisplayPageNum)">{{ nextSideDisplayPageNum }}</a>
      <a :class="isNextDisabled()" @click="nextPage()">Next</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Paginate',
  data () {
    return {
      prevSideDisplayPageNum: 0,
      nextSideDisplayPageNum: 0,
      betweenDisableButton: false,
      displaynextSideButton: false
    }
  },
  mounted () {
    this.setPageProperties()
    this.eventHub.$on('build-page', this.setPageProperties)
  },
  computed: {
    ...mapState([
      'canPrevPage',
      'canNextPage',
      'totalPageCount',
      'currentPageNum',
      'eventHub'
    ])
  },
  methods: {
    ...mapActions([
      'prevPage',
      'nextPage',
      'page'
    ]),
    isPrevDisabled () {
      return this.canPrevPage ? '' : 'disabled'
    },
    isNextDisabled () {
      return this.canNextPage ? '' : 'disabled'
    },
    isCurrent (pageNum) {
      return (this.currentPageNum === pageNum) ? 'current' : ''
    },
    setPageProperties () {
      if (this.totalPageCount < 3) {
        this.prevSideDisplayPageNum = 0
        this.nextSideDisplayPageNum = 0
        this.betweenDisableButton = false
        this.displaynextSideButton = false
      } else if (this.totalPageCount >= 3 && this.totalPageCount <= 5) {
        this.prevSideDisplayPageNum = this.totalPageCount
        this.nextSideDisplayPageNum = 0
        this.betweenDisableButton = false
        this.displaynextSideButton = false
      } else if (this.totalPageCount === 6) {
        this.prevSideDisplayPageNum = 6
        this.nextSideDisplayPageNum = 0
        this.betweenDisableButton = false
        this.displaynextSideButton = false
      } else if (this.totalPageCount > 6) {
        this.prevSideDisplayPageNum = 5
        this.nextSideDisplayPageNum = this.totalPageCount
        this.betweenDisableButton = true
        this.displaynextSideButton = true
      }
    }
  }
}
</script>