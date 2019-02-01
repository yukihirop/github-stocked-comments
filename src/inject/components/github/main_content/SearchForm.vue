<template>
  <div class="d-sm-flex flex-justify-between border-bottom pb-3 pb-sm-5">
    <!-- '"` -->
    <!-- </textarea></xmp> -->
    <form data-pjax="true" class="col-sm-6 mb-3 mb-sm-0" action="/stars" accept-charset="UTF-8" method="get">
      <input name="utf8" type="hidden" value="&#10003;">
      <input type="text" @keyup="searchChange" class="form-control col-12" placeholder="Search comments…" aria-label="Search comments…" autocapitalize="off" autocomplete="off">
    </form>
    <select-details-menu />
  </div>
</template>

<script>
import SelectDetailsMenu from '@/inject/components/github/main_content/SelectDetailsMenu'

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
    searchChange (e) {
      this.searchText = e.target.value
    }
  }
}
</script>