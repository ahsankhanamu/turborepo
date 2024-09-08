import { XPathUtils } from "./XPathUtils";
import { XPathValidator } from "./XPathValidator";
import { XPathIframeHandler } from "./XPathIframeHandler";

/**
 * Class responsible for generating XPaths.
 */
class XPathGenerator {
  /**
   * Generates an XPath expression for a given DOM element.
   * @param {Element} element - The DOM element.
   * @param {boolean} absolute - Whether to generate an absolute XPath.
   * @return {string} The generated XPath expression.
   */
  generate(element, absolute = false) {
    if (!element) throw new Error("Element cannot be null or undefined");
    if (absolute) {
      return XPathUtils.generateAbsoluteXPath(element);
    }
    return XPathUtils.generateRelativeXPath(element);
  }

  /**
   * Detects duplicate XPaths in the current document.
   * @return {Array<string>} Array of duplicate XPaths.
   */
  detectDuplicateXPaths() {
    const allXPaths = XPathUtils.getAllXPaths();
    return XPathValidator.findDuplicates(allXPaths);
  }

  /**
   * Generates XPaths for elements inside iframes.
   * @param {HTMLIFrameElement} iframe - The iframe element.
   * @return {Array<string>} Array of XPath expressions for elements inside the iframe.
   */
  generateForIframe(iframe) {
    if (!(iframe instanceof HTMLIFrameElement))
      throw new Error("Element is not an iframe");
    return XPathIframeHandler.generateForIframe(iframe);
  }
}

export { XPathGenerator };
