import Vue from 'vue'
import Vuex from 'vuex'
import Paginate from '../Paginate'
import Pager from '../../lib/Pager'

Vue.use(Vuex)

function createPaginate({ resourceName, perPage, overrideResource }) {
  const initialState = {
    currentCommnetData: ['ruby', 'javascript', 'vue', 'react', 'rails']
  }

  const store = new Vuex.Store({
    state: initialState
  })

  return new Paginate({ store, resourceName, perPage, overrideResource })
}

const paginate = createPaginate({
  resourceName: 'currentCommnetData',
  perPage: 2,
  overrideResource: false
})

const store = paginate._store
const state = store.state
const innerModuleState = state[Paginate.moduleName]

describe('Paginate', () => {
  describe('constructor', () => {
    it('should initialisation', () => {
      expect(Paginate.moduleName).toEqual("Paginate")
      expect(innerModuleState.pager instanceof Pager).toBe(true)
      expect(innerModuleState.pager.data).toEqual(['ruby', 'javascript', 'vue', 'react', 'rails'])
      expect(innerModuleState.pager.perPage).toEqual(2)
    })
  })

  describe('#pageData(getter)', () => {
    it('should return correctly', () => {
      expect(paginate.pageData).toEqual(['ruby', 'javascript'])
    })
  })

  describe('#prev', () => {
    describe('when page is first', () => {
      it('page should not move to previous', () => {
        paginate.prev()
        expect(innerModuleState.pageData).toEqual(['ruby', 'javascript'])
        expect(state['currentCommnetData']).toEqual(['ruby', 'javascript', 'vue', 'react', 'rails'])
      })

      describe('when overrideResource is true', () => {
        const paginate = createPaginate({
          resourceName: 'currentCommnetData',
          perPage: 2,
          overrideResource: true
        })

        const store = paginate._store
        const state = store.state

        it('state of resourceName should be pageData', () => {
          paginate.prev()
          expect(state['currentCommnetData']).toEqual(['ruby', 'javascript'])
        })
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
    it('page should move specify page', () => {
      paginate.page(3)
      expect(innerModuleState.pageData).toEqual(['rails'])
    })
  })

  describe('#resetPage', () => {
    const data = ['hoge','fuga', 'bar']

    it('page should rewrite data && move first page', () => {
      paginate.resetPage(data)
      expect(innerModuleState.pageData).toEqual(['hoge', 'fuga'])
      expect(state['currentCommnetData']).toEqual(['ruby', 'javascript', 'vue', 'react', 'rails'])
    })
  })

  describe('#_overrideResource', () => {
    describe('when overrideResource is true', () => {
      const paginate = createPaginate({
        resourceName: 'currentCommnetData',
        perPage: 2,
        overrideResource: true
      })

      const store = paginate._store
      const state = store.state

      it('state of resourceName should be pageData', () => {
        paginate._overrideResourceAction()
        expect(state['currentCommnetData']).toEqual(['ruby', 'javascript'])
      })
    })

    describe('when overrideResource is false', () => {
      const paginate = createPaginate({
        resourceName: 'currentCommnetData',
        perPage: 2,
        overrideResource: false
      })

      const store = paginate._store
      const state = store.state

      it('state of resourceName should not be pageData', () => {
        paginate._overrideResourceAction()
        expect(state['currentCommnetData']).toEqual(['ruby', 'javascript', 'vue', 'react', 'rails'])
      })
    })
  })
})