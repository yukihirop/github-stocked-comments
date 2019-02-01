<template>
  <div class="timeline-comment-header clearfix" >
    <!-- 絵文字のボタンとか -->
    <div class="timeline-comment-actions" >
    </div>
    <h3 class="timeline-comment-header-text f5 text-normal">
      <strong class="css-truncate"></strong>
      <a class="author text-inherit css-truncate-target ghh-user-x tooltipstered" :href="href" style="box-shadow: transparent 0px 0px;">{{ userName }}</a>
      commented
      <a href="#issuecomment-457553163" id="issuecomment-457553163-permalink" class="timestamp js-timestamp ghh-comment-x tooltipstered" style="box-shadow: transparent 0px 0px;"><span :datetime="createdAt" :title="createdAt">{{ createdAt }}</span></a>
      <span class="js-comment-fragment">
        <div class="js-comment-edit-history d-inline">
        </div>
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'CommentHeader',
  props: {
    userName: {
      type: String,
      default: ''
    },
    createdAt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      href: '/' + this.userName
    }
  }
}
</script>>