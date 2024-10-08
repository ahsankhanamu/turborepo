// Example utility for validating messages
function validateMessage(message) {
  if (typeof message !== 'object' || !message.type || !message.iframeId) {
    return false;
  }
  return true;
}
