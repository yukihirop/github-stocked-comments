<template>
  <div class="d-sm-flex flex-justify-between border-bottom pb-3 pb-sm-5">
    <!-- '"` -->
    <!-- </textarea></xmp> -->
    <form data-pjax="true" class="col-sm-6 mb-3 mb-sm-0" accept-charset="UTF-8">
      <input name="utf8" type="hidden" value="&#10003;">
      <input type="text" @keyup="searchTimeOut" class="form-control col-12" placeholder="Search comments…" aria-label="Search comments…" autocapitalize="off" autocomplete="off">
    </form>
    <select-details-menu />
  </div>
</template>

<script>
import SelectDetailsMenu from '@/inject/components/github/main_content/SelectDetailsMenu'
import { mapActions } from 'vuex'

// https://forum.vuejs.org/t/delay-keyup/31487/2
let timeout = null

export default {
  name: 'SearchForm',
  components: {
    SelectDetailsMenu: SelectDetailsMenu
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapActions([
      'searchCommentData'
    ]),
    searchTimeOut (e) {
      this.searchText = e.target.value
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        this.searchCommentData(this.searchText)
      }, 300)
    }
  }
}
</script>