/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'executeInjectScript') {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'js/inject.js'
      }, function () {
        sendResponse({farewell: 'execute js/inject.js!'})
      })
    })
    // https://qiita.com/Tachibana446/items/ab15021099d54d1209c2
    // https://developer.chrome.com/extensions/runtime#event-onMessage
    return true
  }
})
/* eslint-enable no-undef */
