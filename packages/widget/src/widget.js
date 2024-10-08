(function () {
  let widgetVisible = false;
  let widget;

  // Show the widget when requested
  function showWidget() {
    if (widgetVisible || window !== window.top) return; // Only show in the top window
    createWidget();
    widgetVisible = true;
  }

  // Hide the widget when requested
  function removeWidget() {
    if (!widgetVisible || window !== window.top) return;
    document.getElementById('widget')?.remove();
    widgetVisible = false;
  }

  // Create the widget element and insert it into the page
  function createWidget() {
    widget = document.createElement('div');
    widget.id = 'widget';
    widget.style = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 400px;
      background-color: #f0f0f0;
      z-index: 10000;
    `;
    widget.innerHTML = '<div id="widget-top-bar">Widget Active. Select elements in iframes.</div>';
    document.body.appendChild(widget);
  }

  // Event listeners to manage widget visibility
  window.addEventListener('showWidget', showWidget);
  window.addEventListener('removeWidget', removeWidget);
})();
