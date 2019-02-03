<template>
  <span v-if="loading">
    <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
      <span v-for="(data, _) in currentCommentData" :key="data.id" >
        <li class="py-4 public source "><main-li :comment-data="data" /></li>
      </span>
    </ul>
    <paginate />
  </span>
</template>>

<script>
import MainLi from '@/inject/components/github/main_content/MainLi'
import Paginate from '@/inject/components/github/main_content/Paginate'
import storage from '@/ext/storage'
import { mapState, mapActions } from 'vuex'
import Mark from 'mark.js'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi,
    Paginate: Paginate
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
    storage.onChangeData((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        if (key === storage.storageKey()) {
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
    setTextHighlight (keyword) {
      this.$nextTick(() => {
        var context = document.querySelectorAll('.githubStockedCommentsMainContent')
        var instance = new Mark(context)
        var options = {
          separateWorldSearch: true,
          diacritics: true
        }

        instance.unmark(options)
        instance.mark(keyword, options)
      })
    }
  }
}
</script>