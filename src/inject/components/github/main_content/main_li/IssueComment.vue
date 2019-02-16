<template>
  <span>
    <div class="js-timeline-item js-timeline-progressive-focus-container">
      <avatar-image :src="src" :userName="userName" />
      <comment-area :commentObject="issueComment" />
    </div>
  </span>
</template>

<script>
import AvatarImage from '@/inject/components/github/main_content/main_li/shared/AvatarImage'
import CommentArea from '@/inject/components/github/main_content/main_li/shared/CommentArea'

export default {
  name: 'IssueComment',
  components: {
    AvatarImage: AvatarImage,
    CommentArea: CommentArea
  },
  props: {
    issueComment: {
      type: Object,
      required: true
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