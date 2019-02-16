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
        <sort-option :selected-class="isSortRecentlyStockedComments ? 'selected' : ''" :option-name="'Recently Stocked comments'" :sort-func="sortRecentlyStockedComments" />
        <sort-option :selected-class="isSortRecentlyPostedComments ? 'selected' : ''" :option-name="'Recently Posted comments'" :sort-func="sortRecentlyPostedComments" />
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
      isSortRecentlyStockedComments: true,
      isSortRecentlyPostedComments: false,
      isSortLongestBodyComments: false,
      selectOptionName: "Recently Stocked comments"
    }
  },
  methods: {
    ...mapActions({
      _sortRecentlyStockedComments: 'sortRecentlyStockedComments',
      _sortRecentlyPostedComments: 'sortRecentlyPostedComments',
      _sortLongestBodyComments: 'sortLongestBodyComments'
    }),
    sortRecentlyStockedComments(){
      this._sortRecentlyStockedComments()
      this.isSortRecentlyStockedComments = true
      this.isSortRecentlyPostedComments = false
      this.isSortLongestBodyComments = false
      this.selectOptionName = "Recently Stocked comments"
    },
    sortRecentlyPostedComments(){
      this._sortRecentlyPostedComments()
      this.isSortRecentlyStockedComments = false
      this.isSortRecentlyPostedComments = true
      this.isSortLongestBodyComments = false
      this.selectOptionName = "Recently Posted comments"
    },
    sortLongestBodyComments(){
      this._sortLongestBodyComments()
      this.isSortRecentlyStockedComments = false
      this.isSortRecentlyPostedComments = false
      this.isSortLongestBodyComments = true
      this.selectOptionName = "Longest comments"
    },
  }
}
</script>