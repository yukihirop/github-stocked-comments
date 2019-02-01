<template>
  <div class="blankslate">
    <h3>Sorry, we couldn’t find any matching comments.</h3>
    <p>You might find what you’re looking for by 
      <a data-pjax="true" href="/search?q=aaa">searching all of GitHub</a>for
      <strong>“aaa”</strong>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SorryPanel',
  props: {
    href: {
      type: String,
      required: true,
      default: ''
    },
    searchWord: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>