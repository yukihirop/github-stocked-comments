<template>
  <span>
    <h3 class="h4 mb-2">Jump to a friend</h3>
    <div>
      <span v-for="following in followingsData" :id="following.id" >
        <a :aria-label="following.login" class="avatar-group-item tooltipped-n" :href="href(following.login)" style="margin: 3px;" target="_blank" rel="noreferrer noopener">
          <img class="avatar ghh-user-x tooltipstered" :src="adjustedSrc(following.avatar_url)" width="42" height="42" :alt="alt(following.login)" style="box-shadow: transparent 0px 0px;">
        </a>
      </span>
    </div>
    <!-- from github -->
    <a class="f4 d-block mb-6" :href="viewAllHref(loginUserName)" target="_blank" rel="noreferrer noopener">
      View all
      <svg class="octicon octicon-chevron-right ml-2" viewBox="0 0 8 16" version="1.1" width="8" height="16" aria-hidden="true">
        <path fill-rule="evenodd" d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"></path>
      </svg>
    </a>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'JumpToaFriend',
  computed: {
    ...mapState('sidebar_friend',[
      'loginUserName',
      'followingsData'
    ])
  },
  methods: {
    href(userName) {
      return `/${userName}`
    },
    alt(userName) {
      return `@${userName}`
    },
    adjustedSrc(avatarURL){
      let before = /v=4$/
      let after = 's=84&amp;v=4'
      return avatarURL.replace(before, after)
    },
    viewAllHref(loginUserName){
      return `/${loginUserName}?tab=following`
    }
  }
}
</script>