<template>
  <span v-if="loading">
    <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
      <span v-for="(data, _) in currentCommentData" :key="data.id" >
        <li class="py-4 public source "><main-li :comment-data="data" /></li>
      </span>
    </ul>
  </span>
</template>>

<script>
import MainLi from '@/inject/components/github/main_content/MainLi'
import storage from '@/ext/storage'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi
  },
  computed: {
    ...mapState([
      'loading',
      'currentCommentData'
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
  methods: {
    ...mapActions([
      'fetchDataFromStorage'
    ])
  }
}
</script>