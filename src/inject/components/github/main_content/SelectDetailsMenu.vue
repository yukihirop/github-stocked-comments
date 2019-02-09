<template>
  <details class="details-reset details-overlay select-menu position-relative">
    <summary class="btn select-menu-button" aria-haspopup="menu">
      <i>Sort:</i>
      <span data-menu-button="">{{ selectOptionName }}</span>
    </summary>
    <div class="select-menu-modal position-absolute right-0" style="z-index: 99" role="menu">
      <div class="select-menu-header">
        <span class="select-menu-title">Sort options</span>
      </div>
      <div class="select-menu-list">
        <sort-option :selected-class="isSortRecentlyComments ? 'selected' : ''" :option-name="'Recently comments'" :sort-func="sortRecentlyComments" />
        <sort-option :selected-class="isSortLongestBodyComments ? 'selected' : ''" :option-name="'Longest comments'" :sort-func="sortLongestBodyComments" />
      </div>
    </div>
  </details>
</template>

<script>
import SortOption from '@/inject/components/github/main_content/select_details_menu/SortOption'
import { mapActions } from 'vuex'

export default {
  name: 'SelectDetailsMenu',
  components: {
    SortOption: SortOption
  },
  data(){
    return {
      isSortRecentlyComments: true,
      isSortLongestBodyComments: false,
      selectOptionName: "Recently comments"
    }
  },
  methods: {
    ...mapActions({
      _sortRecentlyComments: 'sortRecentlyComments',
      _sortLongestBodyComments: 'sortLongestBodyComments'
    }),
    sortRecentlyComments(){
      this._sortRecentlyComments()
      this.isSortRecentlyComments = true
      this.isSortLongestBodyComments = false
      this.selectOptionName = "Recently comments"
    },
    sortLongestBodyComments(){
      this._sortLongestBodyComments()
      this.isSortRecentlyComments = false
      this.isSortLongestBodyComments = true
      this.selectOptionName = "Longest comments"
    },
  }
}
</script>