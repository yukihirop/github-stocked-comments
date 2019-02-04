import Vue from 'vue'
import Vuex from 'vuex'
import Pager from '@/inject/lib/Pager'
import * as plugin from '@/inject/store/plugins/paginate'

import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
var pager = new Pager([], 5)
var paginatePlugin = plugin.createPaginatePlugin()

const initialState = {
  commentData: [],
  currentCommentData: [],
  searchText: '',
  canPrevPage: false,
  canNextPage: true,
  totalPageCount: 1,
  currentPageNum: 1,
  loading: false,
  pager: pager,
  eventHub: new Vue()
}

export default new Vuex.Store({
  strct: debug,
  state: initialState,
  getters,
  actions,
  mutations,
  plugins: [paginatePlugin]
})
