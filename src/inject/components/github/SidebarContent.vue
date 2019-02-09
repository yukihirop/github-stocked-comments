<template>
  <div class="col-md-3 mb-6 mb-md-0">
    <filter-list />
    <hr />
    <filter-list-by-languages />
    <hr />
    <jump-toa-friend />
  </div>
</template>

<script>
import FilterList from '@/inject/components/github/sidebar_content/FilterList'
import FilterListByLanguages from '@/inject/components/github/sidebar_content/FilterListByLanguages'
import JumpToaFriend from '@/inject/components/github/sidebar_content/JumpToaFriend'

export default {
  name: 'SidebarContent',
  components: {
    FilterList: FilterList,
    FilterListByLanguages: FilterListByLanguages,
    JumpToaFriend: JumpToaFriend
  }
}
</script>