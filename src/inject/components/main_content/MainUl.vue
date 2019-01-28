<template>
  <ul class="repo-list list-style-none js-navigation-container js-active-navigation-container">
    <!-- <li class="py-4 border-bottom public source "><main-list /></li> -->
    <li class="py-4 public source "><main-li /></li>
    <li class="py-4 public source "><main-li /></li>
    <li class="py-4 public source "><main-li /></li>
    <li class="py-4 public source "><main-li /></li>
  </ul>
</template>>

<script>
import MainLi from '@/inject/components/main_content/MainLi'

export default {
  name: 'MainUl',
  components: {
    MainLi: MainLi
  }
}
</script>