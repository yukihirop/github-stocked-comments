<template>
  <div class="explore-pjax-container container-lg p-responsive clearfix">
    <div class="d-md-flex flex-md-row-reverse flex-justify-center gutter-md pt-6">
      <sidebar-content />
      <main-content />
    </div>
  </div>
</template>

<script>
import MainContent from '@/inject/components/github/MainContent'
import SidebarContent from '@/inject/components/github/SidebarContent'
import { mapActions } from 'vuex'

export default {
  name: 'ExploreContainar',
  components: {
    MainContent: MainContent,
    SidebarContent: SidebarContent
  },
  created(){
    this.initialize()
    chrome.storage.onChanged.addListener((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        switch(key){
          case 'github-stocked-comments.github.issue':
          case 'github-stocked-comments.github.issuecomment':
            this.initialize()
            break
          case 'github-stocked-comments.github.followings':
            this.fetchLoginUserData()
            break
        }
      })
    })
  },
  methods: {
    ...mapActions([
      'initialize'
    ]),
    ...mapActions('sidebar_friend', [
      'fetchLoginUserData'
    ])
  }
}
</script>

<style>
.container-lg {
  margin-left: auto;
  margin-right: auto;
  max-width: 1012px !important;

}
</style>