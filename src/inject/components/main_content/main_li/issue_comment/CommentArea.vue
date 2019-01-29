<template>
  <div class="timeline-comment-group js-minimizable-comment-group js-targetable-comment" id="issuecomment-457553163" >
    <div class="unminimized-comment comment previewable-edit js-comment js-task-list-container timeline-comment reorderable-task-lists" >
      <comment-header />
      <div class="edit-comment-hide">
        <comment-content />
        <repository-info />
      </div>
    </div>
  </div>
</template>

<script>
import CommentHeader from '@/inject/components/main_content/main_li/issue_comment/CommentHeader'
import CommentContent from '@/inject/components/main_content/main_li/issue_comment/CommentContent'
import RepositoryInfo from '@/inject/components/main_content/main_li/RepositoryInfo'

export default {
  name: 'CommnetArea',
  components: {
    CommentHeader: CommentHeader,
    CommentContent: CommentContent,
    RepositoryInfo: RepositoryInfo
  }
}
</script>