<template>
  <span v-if="loading">
    <span v-if="!isDisplaySorryPanel()">
      <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
        <span v-for="(data, _) in currentCommentData" :key="data.id" >
          <li class="py-4 public source "><main-li :comment-data="data" /></li>
        </span>
      </ul>
      <paginate />
    </span>
    <span v-if="isDisplaySorryPanel()">
      <sorry-panel />
    </span>
  </span>
</template>>

<script>
import MainLi from '@/inject/components/github/main_content/MainLi'
import Paginate from '@/inject/components/github/main_content/Paginate'
import SorryPanel from '@/inject/components/github/main_content/SorryPanel'
import Storage from '@/ext/Storage'
import { mapState, mapActions } from 'vuex'
import Mark from 'mark.js'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi,
    Paginate: Paginate,
    SorryPanel: SorryPanel
  },
  computed: {
    ...mapState([
      'loading',
      'currentCommentData',
      'eventHub'
    ])
  },
  created () {
    this.fetchDataFromStorage()
    chrome.storage.onChanged.addListener((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        if ((key === 'github-stocked-comments.github.issue') || (key === 'github-stocked-comments.github.issuecomment')){
          this.fetchDataFromStorage()
        }
      })
    })
  },
  mounted () {
    this.eventHub.$on('text-highlight', this.setTextHighlight)
  },
  methods: {
    ...mapActions([
      'fetchDataFromStorage'
    ]),
    isDisplaySorryPanel(){
      return this.currentCommentData.length === 0
    },
    setTextHighlight (keyword) {
      this.$nextTick(() => {
        Promise.resolve().then(() => {
          var context = document.querySelectorAll('.githubStockedCommentsMainContent')
          var instance = new Mark(context)
          var options = {
            separateWorldSearch: true,
            diacritics: true
          }

          instance.unmark(options)
          instance.mark(keyword, options)
        })
      })
    }
  }
}
</script>