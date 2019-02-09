import Vue from 'vue'
import Vuex from 'vuex'
import mapGetters from '../mapGetters'
import * as getterTypes from '../../store/getter-types'
import Paginate from '../Paginate'

Vue.use(Vuex)

describe('mapGetters', () => {
  const initialState = {
    currentCommnetData: ['ruby', 'javascript', 'vue', 'react', 'rails']
  }

  const store = new Vuex.Store({
    state: initialState
  })

  const resourceName = 'currentCommnetData'
  const perPage = 2

  const paginate = new Paginate({ store, resourceName, perPage })

  const vm = new Vue({
    store,
    computed: mapGetters({
      prevClass: getterTypes.prevClass,
      nextClass: getterTypes.nextClass,
      pageData:  getterTypes.pageData
    })
  })

  it('should return getter value correctly', () => {
    expect(vm.prevClass).toEqual('disabled')
    expect(vm.nextClass).toEqual('')
    expect(vm.pageData).toEqual(['ruby', 'javascript'])
  })
})