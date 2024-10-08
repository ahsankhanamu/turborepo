chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ scripts: [] }, function (data) {
    data.scripts.forEach((script) => {
      chrome.scripting.executeScript({
        target: { allFrames: true },
        func: runUserScript,
        args: [script],
      });
    });
  });
});

function runUserScript(script) {
  const eventTrigger = script.selectedEvent;

  if (eventTrigger === 'DOMContentLoaded') {
    document.addEventListener('DOMContentLoaded', () => {
      eval(script.script); // Execute the user script
    });
  } else if (eventTrigger === 'beforeUnload') {
    window.addEventListener('beforeunload', () => {
      eval(script.script);
    });
  }
  // Add other event conditions as needed
}
