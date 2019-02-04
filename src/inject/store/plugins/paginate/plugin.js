import Paginate from './plugin/Paginate'

export default function plugin ({
  resourceName,
  perPage = 5
} = {}) {
  return (store) => {
    // eslint-disable-next-line no-new
    new Paginate({ store, resourceName, perPage })
  }
}
