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
import MainLi from '@/inject/components/main_content/MainLi'
import storage from '@/ext/storage'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi
  },
  data () {
    return {
      commentData: this.fetchDataFromStorage()
    }
  },
  created () {
    storage.onChangeData((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        if (key === storage.storageKey()) {
          this.fetchDataFromStorage()
        }
      })
    })
  },
  methods: {
    fetchDataFromStorage () {
      storage.fetchCommentData().then((data) => {
        this.commentData = data
      })
    }
  }
}
</script>