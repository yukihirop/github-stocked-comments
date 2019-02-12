<template>
  <div class="col-md-3 mb-6 mb-md-0">
    <filter-list />
    <span v-if="displayFilterListByLanguages">
      <hr />
      <filter-list-by-languages />
    </span>
    <span v-if="displayJumpToaFriend" >
      <hr />
      <jump-toa-friend />
    </span>
  </div>
</template>

<script>
import FilterList from '@/inject/components/github/sidebar_content/FilterList'
import FilterListByLanguages from '@/inject/components/github/sidebar_content/FilterListByLanguages'
import JumpToaFriend from '@/inject/components/github/sidebar_content/JumpToaFriend'
import { mapState } from 'vuex'

export default {
  name: 'SidebarContent',
  components: {
    FilterList: FilterList,
    FilterListByLanguages: FilterListByLanguages,
    JumpToaFriend: JumpToaFriend
  },
  computed: {
    ...mapState('sidebar_filter',[
      'displayFilterListByLanguages'
    ]),
    ...mapState('sidebar_friend',[
      'displayJumpToaFriend'
    ])
  }
}
</script>