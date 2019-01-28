<template>
  <span>
    <div class="js-timeline-item js-timeline-progressive-focus-container">
      <avatar-image />
      <comment-area />
    </div>
  </span>
</template>

<script>
import AvatarImage from '@/inject/components/main_content/main_li/issue_comment/AvatarImage'
import CommentArea from '@/inject/components/main_content/main_li/issue_comment/CommentArea'

export default {
  name: 'IssueComment',
  components: {
    AvatarImage: AvatarImage,
    CommentArea: CommentArea
  }
}
</script>