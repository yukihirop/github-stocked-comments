import * as event from '@/content/event'
import Header from '@/content/github/components/Header'
import IssueComment from '@/content/github/components/IssueComment'

$(() => {
  const main = new Promise((resolve) => {
    let header = new Header()
    let comment = new IssueComment()

    if (header.isAfterSignIn) {
      header.loadStyleSheet()
      header.attachStockedCommentsLink()
      header.saveLoginUserName()
      comment.attachStockedCommentsButton()
    }

    resolve()
  })

  main.then(() => {
    event.addHashChangeListener()
    event.addBrowserReloadListener()
    event.addStockedCommentsClickListener()
    event.addOnLoadListener()
  })
})
