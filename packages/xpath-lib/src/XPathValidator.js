/**
 * Class responsible for validating and finding duplicate XPaths.
 */
class XPathValidator {
  /**
   * Finds duplicate XPath expressions in an array of XPaths.
   * @param {Array<string>} xpaths - Array of XPath expressions.
   * @return {Array<string>} Array of duplicate XPaths.
   */
  static findDuplicates(xpaths) {
    const seen = new Set();
    const duplicates = new Set();
    xpaths.forEach((xpath) => {
      if (seen.has(xpath)) {
        duplicates.add(xpath);
      } else {
        seen.add(xpath);
      }
    });
    return Array.from(duplicates);
  }
}

export { XPathValidator };
