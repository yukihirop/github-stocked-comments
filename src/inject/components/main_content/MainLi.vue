<template>
  <span>
    <issue-comment />
  </span>
</template>

<script>
import IssueComment from '@/inject/components/main_content/main_li/IssueComment'

export default {
  name: 'MainLi',
  components: {
    IssueComment: IssueComment
  }
}
</script>