<template>
  <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
    <!-- <li class="py-4 border-bottom public source "><main-list /></li> -->
    <!-- <li class="py-4 public source "><main-li /></li> -->
    <!-- <li class="py-4 public source "><main-li /></li> -->
    <span v-for="(data, id) in commentData" :key="data.id" >
      <li class="py-4 public source "><main-li :id="id" :comment-data="data" /></li>
    </span>
  </ul>
</template>>

<script>
import MainLi from '@/inject/components/github/main_content/MainLi'
import storage from '@/ext/storage'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi
  },
  computed: {
    ...mapState('githubModule', [
      'commentData'
    ]),
    ...mapGetters('githubModule', [
      'allCommentData'
    ])
  },
  created () {
    storage.onChangeData((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        if (key === storage.storageKey()) {
          this.fetchDataFromStorage()
        }
      })
    })
    this.fetchDataFromStorage()
  },
  methods: {
    ...mapActions('githubModule', [
      'fetchDataFromStorage'
    ])
  }
}
</script>