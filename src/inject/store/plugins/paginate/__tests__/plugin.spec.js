import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapActions } from 'vuex'
import plugin, { Paginate } from '../index.js'

Vue.use(Vuex)

function getStoreWithPlugin(plugins){
  const initialState = {
    currentCommentData: [],
    count: 0
  }
  
  return new Vuex.Store({
    root: true,
    state: initialState,
    actions: {
      countup: store => store.commit('countup')
    },
    mutations: {
      countup: state => state.count++
    },
    plugins
  })
}

describe('plugin', () => {
  describe('initialize', () => {
    it('should instantiate Paginate and accessible through store.paginate', () => {
      const plugins = [ plugin({ resourceName: 'currentCommentData', perPage: 5 }) ]
      const store = getStoreWithPlugin(plugins)

      expect(store.paginate instanceof Paginate).toBe(true)
    })
  })

  describe('callback', () => {
    const mockPaginate_Next = jest.fn()
    let testPaginate

    const plugins = [
      plugin({ resourceName: 'currentCommentData', perPage: 5 }, (store, paginate) => {
        store.subscribe((mutation, sate) => {
          if (mutation.type === 'countup') {
            mockPaginate_Next()
            testPaginate = paginate
          }
        })
      })
    ]

    const store = getStoreWithPlugin(plugins)
    const vm = new Vue({
      store,
      computed: {
        ...mapState(['count'])
      },
      methods: {
        ...mapActions(['countup'])
      }
    })

    it('countup and page move to next', () => {
      vm.countup()
      expect(vm.count).toEqual(1)
      expect(testPaginate instanceof Paginate).toBe(true)
      expect(mockPaginate_Next).toBeCalledTimes(1)
    })
  })
})