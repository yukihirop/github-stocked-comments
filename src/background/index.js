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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  try{
    if (changeInfo.url) {
      let isLoadStockedComments = false

      if(changeInfo.url.indexOf("https://github.com") === -1) return
      if(changeInfo.status === 'loading' && tab.url.indexOf("#Stocked_Comments") > 0) {
        isLoadStockedComments = true
        chrome.tabs.sendMessage(tabId, { isLoadStockedComments: isLoadStockedComments, openURL: tab.url }, (response) => {
          console.log(response)
        });
      }
    }
  } catch(e) {
    console.log(e)
  }
});