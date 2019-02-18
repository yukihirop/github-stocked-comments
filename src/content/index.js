import * as event from '@/content/event'
import Header from '@/content/github/components/Header'

$(() => {
  const main = new Promise((resolve) => {
    let header = new Header()

    if (header.isAfterSignIn) {
      header.attachStockedCommentsLink()
      header.saveLoginUserName()
    }

    resolve()
  })

  main.then(() => {
    event.addGitHubInjection()
    event.addHashChangeListener()
    event.addBrowserReloadListener()
    event.addBrowserBackHandleListener()
    event.addStockedCommentsClickListener()
    event.addOnLoadListener()
  })
})
