<template>
  <ul class="filter-list">
    <li>
      <a @click="clickAllComments()" :class="['filter-item', clickClass['all']]">
        <span class="count">{{ allCommentsCount }}</span>All comments
      </a>
    </li>
    <li>
      <a @click="clickYourComments()" :class="['filter-item', clickClass['your']]">
        <span class="count">{{ loginUserCommentsCount }}</span>Your comments
      </a>
    </li>
    <li>
      <a @click="clickOthersComments()" :class="['filter-item', clickClass['other']]">
        <span class="count">{{ otherUserCommentsCount }}</span>Other's comments
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterList',
  data(){
    return {
      clickClass: {
        all: 'selected',
        your: '',
        other: ''
      }
    }
  },
  computed: {
    ...mapGetters('sidebar_filter', [
      'allCommentsCount',
      'loginUserCommentsCount',
      'otherUserCommentsCount',
    ])
  },
  methods: {
    ...mapActions('sidebar_filter', [
      'filterToAllCommentData',
      'filterToLoginUserCommentData',
      'filterToOtherUserCommentData'
    ]),
    resetClickClass(){
      Object.keys(this.clickClass).forEach(key => {
        this.clickClass[key] = ''
      })
    },
    clickAllComments(){
      this.filterToAllCommentData()
      this.resetClickClass()
      this.clickClass.all = 'selected'
    },
    clickYourComments(){
      this.filterToLoginUserCommentData()
      this.resetClickClass()
      this.clickClass.your = 'selected'
    },
    clickOthersComments(){
      this.filterToOtherUserCommentData()
      this.resetClickClass()
      this.clickClass.other = 'selected'
    }
  }
}
</script>