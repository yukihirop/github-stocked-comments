<template>
  <span class="githubStockedCommentsMainContent">
    <issue v-if="isIssue" :issue="commentData" />
    <issue-comment v-else-if="isIssueComment" :issue-comment="commentData" />
  </span>
</template>

<script>
import Issue from '@/inject/components/github/main_content/main_li/Issue'
import IssueComment from '@/inject/components/github/main_content/main_li/IssueComment'

export default {
  name: 'MainLi',
  components: {
    Issue: Issue,
    IssueComment: IssueComment
  },
  props: {
    commentData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isIssue: this.commentData.type === 'issue',
      isIssueComment: this.commentData.type === 'issuecomment'
    }
  }
}
</script>