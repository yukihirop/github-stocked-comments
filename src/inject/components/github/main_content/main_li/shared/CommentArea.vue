<template>
  <div class="timeline-comment-group js-minimizable-comment-group js-targetable-comment" id="issuecomment-457553163" >
    <div class="unminimized-comment comment previewable-edit js-comment js-task-list-container timeline-comment reorderable-task-lists" >
      <comment-header :userName="postUserName" :createdAt="postCreatedAt" />
      <div class="edit-comment-hide">
        <comment-content :body="postBody" />
      </div>
      <repo-info :repoUserName="repoUserName" :repoName="repoName" :mainLanguage="mainLanguage" />
    </div>
  </div>
</template>

<script>
import CommentHeader from '@/inject/components/github/main_content/main_li/shared/CommentHeader'
import CommentContent from '@/inject/components/github/main_content/main_li/shared/CommentContent'
import RepoInfo from '@/inject/components/github/main_content/main_li/shared/RepoInfo'

export default {
  name: 'CommnetArea',
  components: {
    CommentHeader: CommentHeader,
    CommentContent: CommentContent,
    RepoInfo: RepoInfo
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
      postBody: this.commentObject.body,
      repoUserName: this.commentObject.repoUserName,
      repoName: this.commentObject.repoName,
      mainLanguage: this.commentObject.mainLanguage
    }
  }
}
</script>