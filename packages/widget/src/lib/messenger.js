const context = (typeof browser.runtime.getBackgroundPage !== 'function') ? 'content' : 'background'

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request) {
    try {
      const object = window.myGlobalModule[request.class]
      object[request.action].apply(module, request.data)
    } catch {
      console.error(error)
    }
  })
})

export function postMessage (request) {
  if (context === 'content') {
    const port = chrome.runtime.connect()
    port.postMessage(request)
  }

  if (context === 'background') {
    if (request.allTabs) {
      chrome.tabs.query({}, (tabs) => {
        for (let i = 0; i < tabs.length; ++i) {
          const port = chrome.tabs.connect(tabs[i].id)
          port.postMessage(request)
        }
      })
    } else if (request.tabId) {
      const port = chrome.tabs.connect(request.tabId)
      port.postMessage(request)
    } else if (request.tabDomain) {
      const url = `*://*.${request.tabDomain}/*`
      chrome.tabs.query({ url }, (tabs) => {
        tabs.forEach((tab) => {
          const port = chrome.tabs.connect(tab.id)
          port.postMessage(request)
        })
      })
    } else {
      query({ active: true, currentWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id)
        port.postMessage(request)
      })
    }
  }
}

export default { postMessage }