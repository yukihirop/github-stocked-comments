<template>
  <span v-if="loading">
    <issue v-if="isIssue" :issue="issue" />
    <issue-comment v-else-if="isIssueComment" :issue-comment="issueComment" />
  </span>
</template>

<script>
import Issue from '@/inject/components/main_content/main_li/Issue'
import IssueComment from '@/inject/components/main_content/main_li/IssueComment'
import CommentDataValidator from '@/inject/validators/main_content/CommentDataValidator'
import MainLi from '@/inject/apis/main_content/MainLi'

export default {
  name: 'MainLi',
  components: {
    Issue: Issue,
    IssueComment: IssueComment
  },
  props: {
    id: {
      type: String,
      required: true
    },
    commentData: {
      type: Object,
      required: true,
      validator (val) {
        return CommentDataValidator.isValid(val)
      }
    }
  },
  data () {
    return {
      api: null,
      issue: null,
      issueComment: null,
      isIssue: false,
      isIssueComment: false,
      loading: false
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.api = new MainLi(this.id, this.commentData)
      if (this.api.isIssue()) {
        this.isIssue = true
        this.issue = this.api.issue()
        this.issue.fetchData((error, loading) => {
          if (error) throw error
          this.loading = loading
        })
      } else if (this.api.isIssueComment()) {
        this.isIssueComment = true
        this.issueComment = this.api.issueComment()
        this.issueComment.fetchData((error, loading) => {
          if (error) throw error
          this.loading = loading
        })
      }
    }
  }
}
</script>