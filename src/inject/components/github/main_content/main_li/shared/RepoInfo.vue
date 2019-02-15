<template>
  <div class="timeline-comment-header clearfix" >
    <h3 class="timeline-comment-header-text f5 text-normal">
      <span class="col-12 col-md-8 pr-md-3">
        <svg class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
        </svg>
        <span class="author">
          <a class="url fn ghh-user-x tooltipstered" :href="userHref" style="box-shadow: transparent 0px 0px;" target="_blank" ref="noreferrer noopener" >{{ repoUserName }}</a>
        </span>
        <span class="path-divider">/</span>
        <strong>
          <a :href="repoHref" target="_blank" ref="noreferrer noopener">{{ repoName }}</a>
        </strong>
      </span>
      <span class="flex-shrink-0 col-6 col-md-4 pt-2 pr-md-3">
        <span class="text-gray flex-auto min-width-0">
          <span :class="['repo-language-color', badgeClass]"></span> {{ mainLanguage }}
        </span>
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'RepoInfo',
  props: {
    repoUserName: {
      type: String,
      required: true
    },
    repoName: {
      type: String,
      required: true
    },
    mainLanguage: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      userHref: `/${this.repoUserName}`,
      repoHref: `/${this.repoUserName}/${this.repoName}`,
      badgeClass: `badge-${this.mainLanguage.toLowerCase()}`
    }
  }
}
</script>

<style lang="scss" scoped="true">
@import "~language-badge/language-badge.css"
</style>