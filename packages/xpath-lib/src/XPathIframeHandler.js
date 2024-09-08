import { XPathUtils } from "./XPathUtils";

/**
 * Class responsible for handling XPaths within iframes.
 */
class XPathIframeHandler {
  /**
   * Generates XPaths for elements inside an iframe.
   * @param {HTMLIFrameElement} iframe - The iframe element.
   * @return {Array<string>} Array of XPath expressions for elements inside the iframe.
   */
  static generateForIframe(iframe) {
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    const allElements = iframeDocument.querySelectorAll("*");
    return Array.from(allElements).map((element) =>
      XPathUtils.generateRelativeXPath(element)
    );
  }
}

export { XPathIframeHandler };
