export var addOnLoadListener = () => {
  window.addEventListener('load', (event) => {
    if (window.location.hash === '#Stocked_Comments') {
      history.pushState('', document.title, window.location.pathname)
    }
  })
}

export var addStockedCommentsClickListener = () => {
  $('a[href="#Stocked_Comments"]').on('click', (event) => {
  })
}

export var addHashChangeListener = () => {
  window.onhashchange = (event) => {
    var urlHash = window.location.hash
    if (urlHash === '#Stocked_Comments') {
      var mainContent = '<div id="github-stocked-comments"></div>'

      $('.application-main').empty()
      $('.application-main').append(mainContent)

      chrome.runtime.sendMessage({message: 'executeInjectScript'}, function (response) {
        console.log(response.farewell)
      })
    }
  }
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

var pressCtrlorCommand = (e) => {
  return ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))
}
