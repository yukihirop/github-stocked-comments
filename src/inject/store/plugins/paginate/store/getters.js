'use strict'

import * as getterTypes from './getter-types'

/* eslint-disable no-irregular-whitespace */
export default {
  [getterTypes.prevClass]: state => state.pager.hasPrev() ? '' : 'disabled',
  [getterTypes.nextClass]: state => state.pager.hasNext() ? '' : 'disabled',
  [getterTypes.pageClass]: state =>　pageNum => state.pager.isCurrent(pageNum) ? 'current' : '',
  [getterTypes.totalPageCount]: state => state.pager.totalPageCount(),
  [getterTypes.pageData]: state => state.pageData
}
/* eslint-enable no-irregular-whitespace */
