/**
 * @fileoverview Description of this file.
 */

/**
 * Shorthand for document.evaluate.
 * @param {HTMLElement} elem HTML element.
 * @param {string} xpath XPath string.
 * @return {Object} The set of unordered snapshot elements which match the
 *     xpath.
 */
util.xpath6 = function(elem, xpath) {
  try {
    var retval = document.evaluate(
      xpath, elem, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return retval;
  } catch (x) {
    // This should not happen. Only used for the development purpose.
    alert([6, x, xpath, elem.tagName, elem.innerHTML].join('\n'));
    throw x;
  }
};

/**
 * Shorthand for document.evaluate.
 * @param {HTMLElement} elem HTML element.
 * @param {string} xpath XPath string.
 * @return {Object} The set of ordered snapshot elements which match the
 *     xpath.
 * */
util.xpath7 = function(elem, xpath) {
  try {
    var retval = document.evaluate(
      xpath, elem, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return retval;
  } catch (x) {
    // This should not happen. Only used for the development purpose.
    alert([7, x, xpath, elem.tagName, elem.innerHTML].join('\n'));
    throw x;
  }
};

/**
 * Shorthand for document.evaluate.
 * @param {HTMLElement} elem HTML element.
 * @param {string} xpath Xpath string.
 * @return {HTMLElement} The first element which matches the XPath.
 */
util.xpath9 = function(elem, xpath) {
  try {
    var retval =
      document.evaluate(
        xpath, elem, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return retval;
  } catch (x) {
    // This should not happen. Only used for the development purpose.
    alert([9, x, xpath, elem.tagName, elem.innerHTML].join('\n'));
    throw x;
  }
};

/**
 * If option.html is opened, select the tab. Otherwise open option.html.
 */
util.openOptionView = function() {
  var optionURL = chrome.extension.getURL('options.html');
  chrome.windows.getAll({ populate: true}, function(wins)
  {
    for (var i = 0; i < wins.length; ++i) {
      var win = wins[i];
      var tabs = win.tabs;
      for (var j = 0; j < tabs.length; ++j) {
        if (tabs[j].url.indexOf(optionURL) == 0) {
        chrome.tabs.update(tabs[j].id, { selected: true });
          return;
        }
      }
    }
    // Currently optionURL is not opened.
    chrome.tabs.create({
      url: optionURL,
      selected: true
    });
  });
};

/**
 * Escape '&', '<', and '>' in a string so that it can be added to innerHTML.
 * @param {string} str a string.
 * @return {string} The converted string.
 */
util.safehtml = function(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
