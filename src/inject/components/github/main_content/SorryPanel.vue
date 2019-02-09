<template>
  <div class="blankslate">
    <h3>Sorry, we couldn’t find any matching comments.</h3>
    <p>You might find what you’re looking for by 
      <a data-pjax="true" :href="href()">searching all of GitHub</a>for
      <strong>{{ searchText }}</strong>.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SorryPanel',
  computed: {
    ...mapState([
      'searchText'
    ])
  },
  methods: {
    href(){
      return "/search?q=" + this.searchText
    }
  }
}
</script>