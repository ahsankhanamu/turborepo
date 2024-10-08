let activeIframes = {};
self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (e) => {
    if (e.data.type === 'registerIframe') {
      activeIframes[e.data.iframeIdentifier] = { active: e.data.active };
    }
    if (e.data.type === 'toggleIframe') {
      activeIframes[e.data.iframeIdentifier].active = e.data.active;
    }
  };
  setInterval(() => {
    port.postMessage({ type: 'updateIframeStates', activeIframes });
  }, 1000);
};
