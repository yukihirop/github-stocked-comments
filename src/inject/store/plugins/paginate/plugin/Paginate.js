'use strict'

import Pager from '../lib/Pager'
import getters from '../store/getters'
import actions from '../store/actions'
import * as actionTypes from '../store/action-types'
import mutations from '../store/mutations'

class Paginate {
  constructor ({ store, resourceName, perPage, overrideResource }) {
    this._moduleName = Paginate.moduleName
    this._store = store
    this._resourceName = resourceName
    this._perPage = perPage
    this._overrideResource = overrideResource
    store.paginate = this

    this._initModule()
  }

  _initModule () {
    let resources = this._store.state[this._resourceName]
    let pager = new Pager(resources, this._perPage)

    let initialState = {
      pageData: pager.page(1),
      pager: pager,
      overrideResource: this._overrideResource,
      paginate: this
    }

    this._store.registerModule(this._moduleName, {
      namespaced: true,
      root: true,
      state: initialState,
      getters,
      actions,
      mutations
    })
  }

  _getNamespace (...modulePath) {
    return this._store._modules.getNamespace(modulePath)
  }

  get pageData(){
    const store = this._store
    const innerModuleState = store.state[this._moduleName]
    return innerModuleState.pageData
  }

  prev (...args) {
    const store = this._store
    const innerModuleState = store.state[this._moduleName]
    const namespace = this._getNamespace(this._moduleName)

    store.dispatch(`${namespace}${actionTypes.prev}`, { innerModuleState })
  }

  next (...args) {
    const store = this._store
    const innerModuleState = store.state[this._moduleName]
    const namespace = this._getNamespace(this._moduleName)

    store.dispatch(`${namespace}${actionTypes.next}`, { innerModuleState })
  }

  page (pageNum) {
    const store = this._store
    const innerModuleState = store.state[this._moduleName]
    const namespace = this._getNamespace(this._moduleName)

    store.dispatch(`${namespace}${actionTypes.page}`, { innerModuleState, pageNum })
  }

  resetPage(data) {
    const store = this._store
    const innerModuleState = store.state[this._moduleName]
    const namespace = this._getNamespace(this._moduleName)

    store.dispatch(`${namespace}${actionTypes.resetPage}`, { innerModuleState, data })
  }

  _overrideResourceAction(){
    const store = this._store
    const namespace = this._getNamespace(this._moduleName)

    store.dispatch(`${namespace}${actionTypes._overrideResource}`, {
      rootState: store.state,
      resourceName: this._resourceName,
      overrideResource: this._overrideResource,
      pageData: this.pageData
    })
  }
}

function getPublicApi () {
  const publicApi = {}
  Object
    .getOwnPropertyNames(Paginate.prototype)
    .filter(methodName => !methodName.startsWith('_'))
    .forEach(methodName => { publicApi[methodName] = methodName })

  Object.freeze(publicApi)

  return publicApi
}

let moduleName = 'Paginate'
Object.defineProperty(Paginate, 'moduleName', {
  get () { return moduleName },
  set (newModuleName) { moduleName = newModuleName }
})

export const publicApi = getPublicApi()
export default Paginate
