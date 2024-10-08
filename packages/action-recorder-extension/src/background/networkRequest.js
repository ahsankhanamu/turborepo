// background.js

export const networkRequests = [];
export const networkResponses = [];

// Network Assertions: Implement using chrome.webRequest API
export function assertNetworkRequest(requestDetails) {
  const found = networkRequests.some((req) => {
    return req.url.includes(requestDetails.urlFragment);
  });
  if (!found) {
    throw new Error(`Network request containing "${requestDetails.urlFragment}" not found`);
  }
}

export function assertNetworkResponse(responseDetails) {
  const found = networkResponses.some((res) => {
    return (
      res.url.includes(responseDetails.urlFragment) && res.statusCode === responseDetails.statusCode
    );
  });
  if (!found) {
    throw new Error(
      `Network response with "${responseDetails.urlFragment}" and status ${responseDetails.statusCode} not found`,
    );
  }
}
