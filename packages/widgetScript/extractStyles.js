function getCssForElement(element) {
  function stripPseudoElementsAndClasses(selector) {
    // Split selectors by commas (handles multiple selectors in one rule)
    return selector
      .split(',')
      .map(singleSelector => {
        // Handle attribute selectors separately (inside square brackets)
        return singleSelector
          .replace(
            /\[.*?\]|:(:?[a-zA-Z-]+)(\(.*?\))?|\:\:[a-zA-Z-]+/g,
            match => {
              // Preserve attribute selectors and only strip pseudo-elements/classes
              return match.startsWith('[') ? match : '';
            }
          )
          .trim();
      })
      .join(', ');
  }

  // Example usage:
  // const selectorText = 'div:hover, p::before, a:focus, span::after, li:nth-child(2), svg:rect, [data-status="foo:bar"]:hover';
  // const cleanedSelector = stripPseudoElementsAndClasses(selectorText);

  // Helper function to get CSS rules from stylesheets
  function getAppliedCssRules(element, matchedRules) {
    const sheets = document.styleSheets;

    for (const sheet of sheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;

        for (const rule of rules) {
          if (rule instanceof CSSStyleRule) {
            const cleanedSelector = stripPseudoElementsAndClasses(
              rule.selectorText
            );

            if (element.matches(cleanedSelector)) {
              matchedRules.add(rule);
            }
          }
        }
      } catch (e) {
        // Catch errors if accessing cross-origin stylesheets
        console.warn('Unable to access some stylesheet due to CORS policy.');
      }
    }
    return matchedRules;
  }

  // Main function to process element and its descendants
  function processElement(element) {
    const matchedRules = new Set();
    getAppliedCssRules(element, matchedRules);
    const descendants = Array.from(element.querySelectorAll('*'));
    descendants.forEach(el => getAppliedCssRules(el, matchedRules));
    let cssString = '';
    for (const rule of matchedRules) {
      cssString += rule.cssText + '\n';
    }
    console.log(cssString);
    console.log(matchedRules);
    return cssString;
  }

  return processElement(element);
}

// Usage: Pass the element to get CSS information
// Example: Extract CSS for a specific element with id="targetElement"
// const element = document.querySelector("#targetElement");
const cssInfo = getCssForElement($0);
