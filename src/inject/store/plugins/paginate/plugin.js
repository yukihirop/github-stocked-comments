import Paginate from './plugin/Paginate'

export default function plugin ({
  resourceName,
  perPage = 5,
  overrideResource = false
} = {}, callback = () => {}) {
  return (store) => {
    // eslint-disable-next-line no-new
    const paginate = new Paginate({ store, resourceName, perPage, overrideResource })
    callback(store, paginate)
  }
}
