import * as event from '@/content/event'
import Header from '@/content/github/components/Header'

$(() => {
  const main = new Promise((resolve) => {
    let header = new Header()
    header.attachStockedCommentsLink()
    header.loadStyleSheet()

    resolve()
  })

  main.then(() => {
    event.addHashChangeListener()
  })
})
