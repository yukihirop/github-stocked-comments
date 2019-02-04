import Vue from 'vue'
import Vuex from 'vuex'
import Paginate from '../Paginate'
import Pager from '../../lib/Pager'

Vue.use(Vuex)

function createPaginate({ resourceName, perPage }) {
  const initialState = {
    currentCommnetData: ['ruby', 'javascript', 'vue', 'react', 'rails']
  }

  const store = new Vuex.Store({
    state: initialState
  })

  return new Paginate({ store, resourceName, perPage })
}

describe('Paginate', () => {
  describe('constructor', () => {
    it('should initialisation', () => {
      const paginate = createPaginate({
        resourceName: 'currentCommnetData',
        perPage: 2
      })

      const store = paginate._store
      const state = store.state
      const innerModuleState = state[Paginate.moduleName]

      expect(Paginate.moduleName).toEqual("Paginate")
      expect(innerModuleState.pager instanceof Pager).toBe(true)
      expect(innerModuleState.pager.data).toEqual(['ruby', 'javascript', 'vue', 'react', 'rails'])
      expect(innerModuleState.pager.perPage).toEqual(2)
    })
  })

  describe('#pageData(getter)', () => {
    const paginate = createPaginate({
      resourceName: 'currentCommnetData',
      perPage: 2
    })

    const store = paginate._store
    const state = store.state
    const innerModuleState = state[Paginate.moduleName]

    it('should return correctly', () => {
      expect(paginate.pageData).toEqual(['ruby', 'javascript'])
    })
  })

  describe('#prev', () => {
    const paginate = createPaginate({
      resourceName: 'currentCommnetData',
      perPage: 2
    })

    const store = paginate._store
    const state = store.state
    const innerModuleState = state[Paginate.moduleName]

    describe('when page is first', () => {
      it('page should not move to previous', () => {
        paginate.prev()
        expect(innerModuleState.pageData).toEqual(['ruby', 'javascript'])
      })
    })

    describe('when page is not first', () => {
      beforeEach(() => {
        innerModuleState.pager.page(3)
        innerModuleState.pageData = ['rails']
      })

      it('page should move to previous', () => {
        paginate.prev()
        expect(innerModuleState.pageData).toEqual(['vue', 'react'])
      })
    })
  })

  describe('#next', () => {
    const paginate = createPaginate({
      resourceName: 'currentCommnetData',
      perPage: 2
    })

    const store = paginate._store
    const state = store.state
    const innerModuleState = state[Paginate.moduleName]

    describe('when page is last', () => {
      beforeEach(() => {
        innerModuleState.pager.page(3)
        innerModuleState.pageData = ['rails']
      })

      it('page should not move to next', () => {
        paginate.next()
        expect(innerModuleState.pageData).toEqual(['rails'])
      })
    })

    describe('when page is not last', () => {
      beforeEach(() => {
        innerModuleState.pager.page(2)
        innerModuleState.pageData = ['vue', 'react']
      })

      it('page should move to next', () => {
        paginate.next()
        expect(innerModuleState.pageData).toEqual(['rails'])
      })
    })
  })

  describe('#page', () => {
    const paginate = createPaginate({
      resourceName: 'currentCommnetData',
      perPage: 2
    })

    const store = paginate._store
    const state = store.state
    const innerModuleState = state[Paginate.moduleName]

    it('page should move specify page', () => {
      paginate.page(3)
      expect(innerModuleState.pageData).toEqual(['rails'])
    })
  })

  describe('#resetPage', () => {
    const paginate = createPaginate({
      resourceName: 'currentCommnetData',
      perPage: 2
    })

    const store = paginate._store
    const state = store.state
    const innerModuleState = state[Paginate.moduleName]
    const data = ['hoge', 'fuga', 'bar']

    it('page should rewrite data && move first page', () => {
      paginate.resetPage(data)
      expect(innerModuleState.pageData).toEqual(['hoge', 'fuga'])
    })
  })
})