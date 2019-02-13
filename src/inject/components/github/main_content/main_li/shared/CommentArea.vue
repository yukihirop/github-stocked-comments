<template>
  <div class="timeline-comment-group js-minimizable-comment-group js-targetable-comment">
    <div class="unminimized-comment comment previewable-edit js-comment js-task-list-container timeline-comment reorderable-task-lists" >
      <comment-header :userName="postUserName" :createdAt="postCreatedAt" :originURL="postOriginURL" />
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
      postOriginURL: this.commentObject.postOriginURL,
      repoUserName: this.commentObject.repoUserName,
      repoName: this.commentObject.repoName,
      mainLanguage: this.commentObject.mainLanguage
    }
  }
}
</script>