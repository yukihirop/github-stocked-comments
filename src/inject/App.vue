<template>
  <span>
    <top-title />
    <explore-container />
  </span>
</template>

<script>
import TopTitle from '@/inject/components/github/TopTitle'
import ExploreContainer from '@/inject/components/github/ExploreContainer'

export default {
  name: 'App',
  components: {
    TopTitle: TopTitle,
    ExploreContainer: ExploreContainer
  }
}
</script>