<template>
  <span>
    <top-title />
    <explore-container />
  </span>
</template>

<script>
import TopTitle from '@/inject/components/TopTitle'
import ExploreContainer from '@/inject/components/ExploreContainer'

export default {
  name: 'App',
  components: {
    TopTitle: TopTitle,
    ExploreContainer: ExploreContainer
  }
}
</script>