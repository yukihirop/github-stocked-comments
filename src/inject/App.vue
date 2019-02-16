<template>
  <span>
    <top-title />
    <explore-container />
    <delete-modal v-if="isShowDeleteModal" @close="closeDeleteModal" />
  </span>
</template>

<script>
import TopTitle from '@/inject/components/github/TopTitle'
import ExploreContainer from '@/inject/components/github/ExploreContainer'
import DeleteModal from '@/inject/components/extension/main_content/main_li/DeleteModal'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    TopTitle: TopTitle,
    ExploreContainer: ExploreContainer,
    DeleteModal: DeleteModal
  },
  computed: {
    ...mapState('main_ext', [
      'isShowDeleteModal'
    ])
  },
  methods: {
    ...mapActions('main_ext', [
      'closeDeleteModal'
    ])
  }
}
</script>