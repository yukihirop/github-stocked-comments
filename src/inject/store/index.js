import Vue from 'vue'
import Vuex from 'vuex'
import PaginatePlugin from '@/inject/store/plugins/paginate'
import { paginateCallback } from '@/inject/store/plugins/paginateCallback'

import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'
import sidebar from './modules/sidebar/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = {
  commentData: [],
  currentCommentData: [],
  searchText: '',
  loading: false,
  eventHub: new Vue()
}

export default new Vuex.Store({
  strct: debug,
  state: initialState,
  getters,
  actions,
  mutations,
  modules: {
    sidebar
  },
  plugins: [
    PaginatePlugin(
    {
      resourceName: 'currentCommentData',
      perPage: 5,
      overrideResource: true
    },
    (store, paginate) => { paginateCallback(store, paginate) }
    )
  ]
})
