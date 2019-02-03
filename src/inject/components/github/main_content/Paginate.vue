<template>
  <div class="paginate-container">
    <div class="pagination">
      <a :class="isPrevDisabled()" @click="prevPage()">Previous</a>
      <a :class="isNextDisabled()" @click="nextPage()">Next</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Paginate',
  computed: {
    ...mapState([
      'canPrevPage',
      'canNextPage'
    ])
  },
  methods: {
    ...mapActions([
      'prevPage',
      'nextPage'
    ]),
    isPrevDisabled () {
      return this.canPrevPage ? '' : 'disabled'
    },
    isNextDisabled () {
      return this.canNextPage ? '' : 'disabled'
    }
  }
}
</script>