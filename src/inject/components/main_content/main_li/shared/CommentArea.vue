<template>
  <div class="timeline-comment-group js-minimizable-comment-group js-targetable-comment" id="issuecomment-457553163" >
    <div class="unminimized-comment comment previewable-edit js-comment js-task-list-container timeline-comment reorderable-task-lists" >
      <comment-header :userName="postUserName" :createdAt="postCreatedAt" />
      <div class="edit-comment-hide">
        <comment-content :body="postBody" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentHeader from '@/inject/components/main_content/main_li/shared/CommentHeader'
import CommentContent from '@/inject/components/main_content/main_li/shared/CommentContent'

export default {
  name: 'CommnetArea',
  components: {
    CommentHeader: CommentHeader,
    CommentContent: CommentContent
  },
  props: {
    commentObject: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      postUserName: this.commentObject.postUserName,
      postCreatedAt: this.commentObject.createdAt,
      postBody: this.commentObject.body
    }
  }
}
</script>