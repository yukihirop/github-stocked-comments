'use strict'

import { normalizeMap } from '../lib/utils'
import { publicApi } from './Paginate'

export default (actions) => {
  const res = {}
  const publicApiTypes = Object.values(publicApi)

  normalizeMap(actions).forEach(({key, val}) => {
    // e.x.) convert from '@paginate/action/PREV' to 'prev'
    const normalizeVal = val.split('/').slice(-1)[0].toLowerCase()

    if (!publicApiTypes.includes(normalizeVal) && process.env.NODE_ENV !== 'production') {
      throw new Error(`unknow actionType '${val}' is passed to mapActions`)
    }

    res[key] = function mappedAction (...args) {
      const paginate = this.$store.paginate
      return paginate[normalizeVal](...args)
    }
  })

  return res
}
