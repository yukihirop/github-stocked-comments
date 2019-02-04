import Vue from 'vue'
import Vuex from 'vuex'
import plugin, { Paginate } from '../index.js'

Vue.use(Vuex)

function getStoreWithPlugin(plugins){
  const initialState = {
    currentCommentData: []
  }

  return new Vuex.Store({
    state: initialState,
    plugins
  })
}

describe('plugin', () => {
  it('should instantiate Paginate and accessible through store.paginate', () => {
    const plugins = [
      plugin({ resourceName: 'currentCommentData', perPage: 5 })
    ]

    const store = getStoreWithPlugin(plugins)

    expect(store.paginate instanceof Paginate).toBe(true)
  })
})