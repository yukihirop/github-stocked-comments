import { normalizeMap, normalizeNamespaceName } from '../lib/utils'

export default (getters) => {
  const res = {}
  normalizeMap(getters).forEach(({key, val}) => {
    res[key] = function mappedGetter () {
      const namespace = normalizeNamespaceName(this.$store.paginate._moduleName)

      return this.$store.getters[`${namespace}${val}`]
    }
  })

  return res
}
