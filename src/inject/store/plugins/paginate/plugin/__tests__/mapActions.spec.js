import Vue from 'vue'
import Vuex from 'vuex'
import * as actionTypes from '../../store/action-types'
import mapActions from '../mapActions'

Vue.use(Vuex)

describe('mapActions', () => {
  const moduleName = 'Paginate'
  const mockPrev = jest.fn()
  const mockNext = jest.fn()
  const mockPage = jest.fn()
  const store = new Vuex.Store({})
  const mockedPaginate = {
    _moduleName: moduleName,
    prev: mockPrev,
    next: mockNext,
    page: mockPage
  }

  store.paginate = mockedPaginate

  const vm = new Vue({
    store,
    methods: mapActions({
      prevPage: actionTypes.prev,
      nextPage: actionTypes.next,
      movePage: actionTypes.page
    })
  })

  it('should map actions, call Paginate, and dispatch action', () => {
    vm.prevPage()
    vm.nextPage()
    vm.movePage(2)
    expect(mockPrev).toBeCalledTimes(1)
    expect(mockNext).toBeCalledTimes(1)
    expect(mockPage).toBeCalledTimes(1)
    expect(mockPage).toBeCalledWith(2)
  })

  it('should throw when unknown actionType is mapped', () => {
    expect(() => mapActions(['unknown'])).toThrow("unknow actionType 'unknown' is passed to mapActions")
  })
})