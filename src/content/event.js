import Header from '@/content/github/components/Header'
import IssueComment from '@/content/github/components/IssueComment'
import githubInjection from 'github-injection'

export var addGitHubInjection = () => {
  githubInjection(() => {
    if(new RegExp("issues").test(window.location.pathname)) {
      let header = new Header()
      let comment = new IssueComment
      header.loadStyleSheet()
      comment.attachStockedCommentsButton()
    }
  })
}

export var addBrowserBackHandleListener = () => {
  if("onhashchange" in window){
    $(window).on('hashchange', function(event){
      let newURL = event.originalEvent.newURL
      let oldURL = event.originalEvent.oldURL
      if(newURL.indexOf("#Stocked_Comments") === -1 && oldURL.indexOf("#Stocked_Comments") > 0){
        window.location.href = newURL
      }
    })
  }
}

export var addHashChangeListener = () => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let isLoadStockedComments = request.isLoadStockedComments
    if (isLoadStockedComments){
      let mainContent = '<div id="github-stocked-comments"></div>'
      let footerContent = '<div id="github-stocked-comments-footer"></div>'
      let firstDiv = $('body').children()[0]
      let secondDiv = $('body').children()[1]
      let thirdDiv = $('body').children()[2]
      $('body').empty()
      $('body').append(firstDiv)
      $('body').append(secondDiv)
      $('body').append(thirdDiv)
      $('body').append('<div role="main" class="application-main">').append(mainContent)
      $('body').append('<div role="contentinfo" class="application-footer">').append(footerContent)

      sendResponse({farewell: "call executeInjectScript (background)"})
      chrome.runtime.sendMessage({message: 'executeInjectScript'}, function (response) {
        console.log(response.farewell)
      })
    }
  });
}

export var addBrowserReloadListener = () => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'r' && pressCtrlorCommand(event)) {
      var urlHash = window.location.hash
      if (urlHash === '#Stocked_Comments') {
        $(window).trigger('hashchange')
      }
    }
  }, false)
}

// As addBrowserReloadListener works properly
export var addStockedCommentsClickListener = () => {
  $('a[href="#Stocked_Comments"]').on('click', (event) => {
  })
}

export var addOnLoadListener = () => {
  window.addEventListener('load', (event) => {
    if (window.location.hash === '#Stocked_Comments') {
      history.pushState('', document.title, window.location.pathname)
    }
  })
}

var pressCtrlorCommand = (e) => {
  return ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))
}
