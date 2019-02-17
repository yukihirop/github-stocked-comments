import Vue from 'vue'
import App from './App.vue'
import store from '@/inject/store'

Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  el: '#github-stocked-comments',
  store,
  render: h => h(App)
})
