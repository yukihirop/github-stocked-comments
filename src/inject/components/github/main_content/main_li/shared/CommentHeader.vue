<template>
  <div class="timeline-comment-header clearfix" >
    <!-- 絵文字のボタンとか -->
    <div class="timeline-comment-actions" >
      <span class="timeline-comment-label text-bold tooltipped tooltipped-multiline tooltipped-s" :aria-label="originURL">
        <a class="author text-inherit css-truncate-target ghh-user-x tooltipstered" :href="originURL" target="_blank" ref="noreferrer noopener" style="box-shadow: transparent 0px 0px;">Go to</a>
      </span>
    </div>
    <h3 class="timeline-comment-header-text f5 text-normal">
      <strong class="css-truncate"></strong>
      <a class="author text-inherit css-truncate-target ghh-user-x tooltipstered" :href="href" style="box-shadow: transparent 0px 0px;">{{ userName }}</a>
      commented
      <a @click.stop="" :href="originURL" :aria-label="originURL" target="_blank" ref="noreferrer noopener" class="timestamp js-timestamp ghh-comment-x tooltipstered" style="box-shadow: transparent 0px 0px;">{{ createdAt }}</a>
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
    },
    originURL: {
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