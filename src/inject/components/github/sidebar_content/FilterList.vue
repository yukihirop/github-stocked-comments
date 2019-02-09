<template>
  <ul class="filter-list">
    <li>
      <a @click="allCommentData()" class="filter-item selected">
        <span class="count">{{ allCommentsCount }}</span>All comments
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterList',
  computed: {
    ...mapGetters('sidebar', [
      'allCommentsCount'
    ])
  },
  methods: {
    ...mapActions([
      'allCommentData'
    ])
  }
}
</script>