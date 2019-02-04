import plugin from './plugin'

import * as getterTypes from './store/getter-types'
import * as actionTypes from './store/action-types'
import mapActions from './plugin/mapActions'
import mapGetters from './plugin/mapGetters'
import Paginate from './plugin/Paginate'

export {
  actionTypes,
  getterTypes,
  mapActions,
  mapGetters,
  Paginate
}

export default plugin
