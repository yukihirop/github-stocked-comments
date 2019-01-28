export var addHashChangeListener = () => {
  window.addEventListener('hashchange', (event) => {
    var urlHash = window.location.hash
    if (urlHash === '#Stocked_Comments') {
      var mainContent = '<div id="github-stocked-comments"></div>'
      $('.application-main').empty()
      $('.application-main').append(mainContent)

      chrome.runtime.sendMessage({message: 'executeInjectScript'}, function (response) {
        console.log(response.farewell)
      })
    }
  })
}
