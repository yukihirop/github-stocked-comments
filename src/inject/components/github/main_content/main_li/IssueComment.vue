<template>
  <span>
    <div class="js-timeline-item js-timeline-progressive-focus-container">
      <avatar-image :src="src" :userName="userName" />
      <comment-area :commentObject="issueComment" />
    </div>
  </span>
</template>

<script>
import AvatarImage from '@/inject/components/main_content/main_li/shared/AvatarImage'
import CommentArea from '@/inject/components/main_content/main_li/shared/CommentArea'
import IssueCommentValidator from '@/inject/validators/main_content/main_li/IssueCommentValidator'

export default {
  name: 'IssueComment',
  components: {
    AvatarImage: AvatarImage,
    CommentArea: CommentArea
  },
  props: {
    issueComment: {
      type: Object,
      required: true,
      validator (val) {
        return IssueCommentValidator.isValid(val)
      }
    }
  },
  data () {
    return {
      src: this.issueComment.postUserAvatarURL,
      userName: this.issueComment.postUserName
    }
  }
}
</script>