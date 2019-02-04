<template>
  <div class="d-sm-flex flex-justify-between border-bottom pb-3 pb-sm-5">
    <form class="col-sm-6 mb-3 mb-sm-0" accept-charset="UTF-8">
      <input type="text" name="searchForm" @keyup="searchTimeOut" @keydown.self.prevent.enter class="form-control col-12" placeholder="Search comments…" aria-label="Search comments…">
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