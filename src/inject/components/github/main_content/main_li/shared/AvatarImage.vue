<template>
  <div class="avatar-parent-child timeline-comment-avatar">
    <a class="d-inline-block" :href="href" aria-describedby="hovercard-aria-description">
      <img class="avatar rounded-1 ghh-user-x tooltipstered" height="44" width="44" :alt="alt" :src="src" style="box-shadow: transparent 0px 0px;">
    </a>
  </div>
</template>

<script>
export default {
  name: 'AvatarImage',
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    userName: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      href: '/' + this.userName,
      alt: '@' + this.userName
    }
  }
}
</script>