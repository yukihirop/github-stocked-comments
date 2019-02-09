<template>
  <div class="col-md-9">
    <search-form />
    <main-ul />
  </div>
</template>

<script>
import SearchForm from '@/inject/components/github/main_content/SearchForm'
import MainUl from '@/inject/components/github/main_content/MainUl'

export default {
  name: 'MainContent',
  components: {
    SearchForm: SearchForm,
    MainUl: MainUl
  }
}
</script>