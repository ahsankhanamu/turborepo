/**
 * Class representing an XPath Node.
 */
class XPathNode {
  constructor(element) {
    this.element = element;
    this.tagName = element.tagName.toLowerCase();
    this.index = XPathUtils.getElementIndex(element);
  }

  /**
   * Generates the XPath segment for the node.
   * @return {string} The XPath segment.
   */
  toString() {
    return `${this.tagName}[${this.index}]`;
  }
}

export { XPathNode };
