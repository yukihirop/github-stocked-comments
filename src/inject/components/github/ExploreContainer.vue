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
    console.log("ExploreContainar#created")
    this.fetchDataFromStorage()
    chrome.storage.onChanged.addListener((changes, namespace) => {
      Object.keys(changes).forEach((key) => {
        if ((key === 'github-stocked-comments.github.issue') || (key === 'github-stocked-comments.github.issuecomment')){
          this.fetchDataFromStorage()
        }
      })
    })
  },
  methods: {
    ...mapActions([
      'fetchDataFromStorage'
    ]),
  }
}
</script>