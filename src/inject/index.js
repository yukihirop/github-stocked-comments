import Vue from 'vue'
import App from './App.vue'
import store from '@/inject/store'

(() => new Vue({
  el: '#github-stocked-comments',
  store,
  render: h => h(App)
}))()
