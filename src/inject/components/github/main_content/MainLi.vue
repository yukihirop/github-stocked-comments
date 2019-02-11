<template>
  <span>
    <issue v-if="isIssue" :issue="issue" />
    <issue-comment v-else-if="isIssueComment" :issue-comment="issuecomment" />
  </span>
</template>

<script>
import Issue from '@/inject/components/github/main_content/main_li/Issue'
import IssueComment from '@/inject/components/github/main_content/main_li/IssueComment'
import IssueModel from '@/inject/models/github/IssueModel'
import IssueCommentModel from '@/inject/models/github/IssueCommentModel'

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
      isIssueComment: this.commentData.type === 'issuecomment',
      issue: new IssueModel(this.commentData),
      issuecomment: new IssueCommentModel(this.commentData)
    }
  }
}
</script>