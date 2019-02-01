import Vue from 'vue'
import Vuex from 'vuex'
import githubModule from '@/inject/store/modules/github'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strct: debug,
  modules: {
    githubModule
  }
})
