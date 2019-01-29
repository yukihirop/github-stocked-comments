import * as event from '@/content/event'
import Header from '@/content/github/components/Header'

$(() => {
  const main = new Promise((resolve) => {
    let header = new Header()
    header.attachStockedCommentsLink()

    resolve()
  })

  main.then(() => {
    event.addHashChangeListener()
    event.addBrowserReloadListener()
    event.addStockedCommentsClickListener()
    event.addOnLoadListener()
  })
})
