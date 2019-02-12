<template>
  <span>
    <div class="js-timeline-item js-timeline-progressive-focus-container">
      <avatar-image :src="src" :userName="userName" />
      <comment-area :commentObject="issue" />
    </div>
  </span>
</template>

<script>
import AvatarImage from '@/inject/components/github/main_content/main_li/shared/AvatarImage'
import CommentArea from '@/inject/components/github/main_content/main_li/shared/CommentArea'

export default {
  name: 'Issue',
  components: {
    AvatarImage: AvatarImage,
    CommentArea: CommentArea
  },
  props: {
    issue: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      src: this.issue.postUserAvatarURL,
      userName: this.issue.postUserName
    }
  }
}
</script>