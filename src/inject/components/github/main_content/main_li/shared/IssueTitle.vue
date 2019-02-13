<template>
  <div class="custom timeline-comment-header clearfix" >
    <h3 class="timeline-comment-header-text text-normal gh-header-title custom">  {{ issueTitle }}</h3>
  </div>
</template>

<script>
export default {
  name: 'IssueTitle',
  props: {
    issueTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped="true">
div.custom {
  background: transparent;
  border-left: solid 5px #586069;
}
</style>