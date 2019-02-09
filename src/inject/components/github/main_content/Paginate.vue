<template>
  <div class="paginate-container">
    <div class="pagination">
      <a :class="prevClass" @click="prevPage()">Previous</a>
      <a v-for="n in prevSideDisplayPageNum" :class="pageClass(n)" @click="movePage(n)">{{ n }}</a>
      <a v-if="betweenDisableButton" class="disabled">...</a>
      <a :class="pageClass(nextSideDisplayPageNum - 1)" v-if="displaynextSideButton" @click="movePage(nextSideDisplayPageNum - 1)">{{ nextSideDisplayPageNum - 1 }}</a>
      <a :class="pageClass(nextSideDisplayPageNum)" v-if="displaynextSideButton" @click="movePage(nextSideDisplayPageNum)">{{ nextSideDisplayPageNum }}</a>
      <a :class="nextClass" @click="nextPage()">Next</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  actionTypes,
  getterTypes,
  mapActions as mapPaginateActions,
  mapGetters as mapPaginateGetters
} from '@/inject/store/plugins/paginate'

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
      'eventHub'
    ]),
    ...mapPaginateGetters({
      prevClass: getterTypes.prevClass,
      nextClass: getterTypes.nextClass,
      pageClass: getterTypes.pageClass,
      totalPageCount: getterTypes.totalPageCount
    })
  },
  methods: {
    ...mapPaginateActions({
      prevPage: actionTypes.prev,
      nextPage: actionTypes.next,
      movePage: actionTypes.page
    }),
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