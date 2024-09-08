import { XPathNode } from "./XPathNode";

/**
 * Utility class for XPath operations.
 */
class XPathUtils {
  /**
   * Generates an absolute XPath for a given element.
   * @param {Element} element - The DOM element.
   * @return {string} The absolute XPath expression.
   */
  static generateAbsoluteXPath(element) {
    const path = [];
    while (element) {
      const node = new XPathNode(element);
      path.unshift(node.toString());
      element = element.parentElement;
    }
    return `/${path.join("/")}`;
  }

  /**
   * Generates a relative XPath for a given element.
   * @param {Element} element - The DOM element.
   * @return {string} The relative XPath expression.
   */
  static generateRelativeXPath(element) {
    const path = [];
    while (element && element !== document.body) {
      const node = new XPathNode(element);
      path.unshift(node.toString());
      element = element.parentElement;
    }
    return `.${path.join("/")}`;
  }

  /**
   * Gets the index of an element among its siblings with the same tag name.
   * @param {Element} element - The DOM element.
   * @return {number} The index.
   */
  static getElementIndex(element) {
    const siblings = Array.from(element.parentNode.children).filter(
      (sibling) => sibling.tagName === element.tagName
    );
    return siblings.indexOf(element) + 1;
  }

  /**
   * Retrieves all XPath expressions in the current document.
   * @return {Array<string>} Array of XPath expressions.
   */
  static getAllXPaths() {
    const allElements = document.querySelectorAll("*");
    return Array.from(allElements).map((element) =>
      this.generateRelativeXPath(element)
    );
  }
}

export { XPathUtils };
