/**
 * @fileoverview Defines all the browser actions which include names, i18n
 *     descriptions, arguments, and the action functions.
 */

/**
 * @param {string} str The integer string.
 * @param {Number} defaultValue If the str is not a number string, returns
 *     this value.
 * @return {Number} The parsed number.
 */
var parseIntDefault = function(str, defaultValue) {
  var n = parseInt(str, 10);
  if (isNaN(n)) {
    return defaultValue;
  } else {
    return n;
  }
};

/**
 * @type {Array.<Object.<string, *>>} All the browser actions.
 */
var BROWSER_ACTIONS = [

{
  i18n: 'Tab Actions'
}, {
  name: 'OpenAPage',
  i18n: 'Open my favorite page in a new tab',
  description: 'Open "$1" in a new tab',
  args: {
    'URL': 'input'
  },
  func: function(tab, args) {
    chrome.tabs.create({
      index: tab.index + 1,
      'url': args[0]
    });
  }
}, {
  name: 'OpenTab',
  i18n: 'Open a new tab',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://newtab/',
      selected: true
    });
  }
}, {
  name: 'OpenTabLast',
  i18n: 'Open a new tab last',
  func: function(tab) {
    chrome.tabs.create({
      url: 'chrome://newtab/',
      selected: true
    });
  }
}, {
  name: 'OpenAboutBlank',
  i18n: 'Open a blank tab',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'about:blank'
    });
  }
}, {
  name: 'OpenAboutBlankLast',
  i18n: 'Open a blank tab last',
  func: function(tab) {
    chrome.tabs.create({
      url: 'about:blank'
    });
  }
}, {
  name: 'OpenBackgroundTab',
  i18n: 'Open a background tab',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://newtab/',
      selected: false
    });
  }
}, {
  name: 'OpenBackgroundTabLast',
  i18n: 'Open a background tab last',
  func: function(tab) {
    chrome.tabs.create({
      url: 'chrome://newtab/',
      selected: false
    });
  }
}, {
  name: 'CloseOtherTabs',
  i18n: 'Close other tabs',
  func: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        if (tabs[i].id != tab.id) {
          chrome.tabs.remove(tabs[i].id);
        }
      }
    });
  }
}, {
  name: 'CloseLeftTabs',
  i18n: 'Close left tabs',
  func: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      var found = false;
      for (var i = tabs.length - 1; i >= 0; --i) {
        if (found) {
          chrome.tabs.remove(tabs[i].id);
        }
        if (tabs[i].id == tab.id) {
          found = true;
        }
      }
    });
  }
}, {
  name: 'CloseRightTabs',
  i18n: 'Close right tabs',
  func: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      var found = false;
      for (var i = 0; i < tabs.length; ++i) {
        if (found) {
          chrome.tabs.remove(tabs[i].id);
        }
        if (tabs[i].id == tab.id) {
          found = true;
        }
      }
    });
  }
}, {
  name: 'CloseTab',
  i18n: 'Close the current tab',
  func: function(tab) {
    chrome.tabs.remove(tab.id);
  }
}, {
  name: 'DuplicateTab',
  i18n: 'Duplicate the current tab',
  func: function(tab) {
    chrome.tabs.create({
      'url': tab.url,
      index: tab.index + 1
    });
  }
}, {
  name: 'DuplicateToNewWindow',
  i18n: 'Duplicate the current tab to a new window',
  func: function(tab) {
    chrome.windows.create({
      'url': tab.url
    });
  }
}, {
  name: 'SelectLeftTab',
  i18n: 'Select the left tab',
  func: function(tab) {
    var winid = tab.windowId;
    var tabid = tab.id;
    chrome.tabs.getAllInWindow(winid, function(tabs) {
      for (var j = 0; j < tabs.length; ++j) {
        if (tabs[j].id == tabid) {
          chrome.tabs.update(tabs[(j + tabs.length - 1) % tabs.length].id, {
            'selected': true
          });
          break;
        }
      }
    });
  }
}, {
  name: 'SelectRightTab',
  i18n: 'Select the right tab',
  func: function(tab) {
    var winid = tab.windowId;
    var tabid = tab.id;
    chrome.tabs.getAllInWindow(winid, function(tabs) {
      for (var j = 0; j < tabs.length; ++j) {
        if (tabs[j].id == tabid) {
          chrome.tabs.update(tabs[(j + 1) % tabs.length].id, {
            'selected': true
          });
          break;
        }
      }
    });
  }
}, {
  name: 'SelectNthTab',
  i18n: 'Select the N-th tab',
  args: {
    'N-th? (1, 2, ...)': 'input'
  },
  description: 'Select the $1-th tab',
  func: function(tab, args) {
    var n = parseIntDefault(args[0], 1) - 1;
    if (n < 0) {
      n = 0;
    }
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      if (n < tabs.length) {
        chrome.tabs.update(tabs[n].id, {
          'selected': true
        });
      }
    });
  }
}, {
  name: 'SelectLastTab',
  i18n: 'Select the last tab',
  func: function(tab) {
    chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
      if (tabs.length) {
        chrome.tabs.update(tabs[tabs.length - 1].id, {
          'selected': true
        });
      }
    });
  }






}, {
  i18n: 'Page Action'
}, {
  name: 'Back',
  i18n: 'Back',
  func: function(tab) {
    var exec = function() {
      window.history.back();
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'Forward',
  i18n: 'Forward',
  func: function(tab) {
    var exec = function() {
      window.history.forward();
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'BackToFirst',
  i18n: 'Back to the first page',
  func: function(tab) {
    var exec = function() {
      window.history.go(-window.history.length + 1);
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'Reload',
  i18n: 'Reload',
  func: function(tab) {
    var exec = function(tab) {
      window.location.reload();
    };
    chrome.tabs.executeScript(tab.id, {
      code: '(' + exec.toString() + ')()'
    });
  }
}, {
  name: 'CachelessReload',
  i18n: 'Reload (Cacheless)',
  func: function(tab) {
    var exec = function(tab) {
      window.location.reload(true);
    };
    chrome.tabs.executeScript(tab.id, {
      code: '(' + exec.toString() + ')()'
    });
  }
}, {
  name: 'UpperDirectory',
  i18n: 'Upper directory',
  func: function(tab) {
    var exec = function() {
      window.location.href =
        window.location.href.replace(/\/[^\/]*\/?$/, '/');
    };
    chrome.tabs.executeScript(tab.id, {
      code: '(' + exec.toString() + ')()'
    });
  }
}, {
  name: 'ViewSource',
  i18n: 'View source',
  func: function(tab) {
    var exec = function() {
      window.location.href = 'view-source:' + window.location.href;
    };
    chrome.tabs.executeScript(tab.id, {
      code: '(' + exec.toString() + ')()'
    });
  }




}, {
  i18n: 'Inner page action'
}, {
  name: 'BlurFocus',
  i18n: 'Blur the focused element',
  func: function(tab) {
    var exec = function() {
      document.activeElement.blur();
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'FocusNthTextInput',
  i18n: 'Focus on the N-th text input',
  description: 'Focus on the $1-th text input',
  args: {
    'N-th? (1, 2, ...)': 'input'
  },
  func: function(tab, args) {
    var exec = function(nth) {
      var elem = document.evaluate(
          '//input[@type="text" or not(@type)]|//select|//textarea||button',
          document.body, null, 7, null).snapshotItem(nth);
      if (elem) {
        elem.scrollIntoView(false);
        elem.focus();
      }
    };
    var arg0 = parseIntDefault(args[0], 1) - 1;
    return '(' + exec.toString() + ')(' + arg0 + ')';
  }
}, {
  name: 'FocusNextElement',
  i18n: 'Focus on the next input element',
  func: function(tab) {
    var exec = function() {
      var elemsnaps = document.evaluate(
          '//input[not(@type="hidden")]|//select|//textarea|//button',
          document.body, null, 7, null);
      var focus_next = function(index) {
        for (var j = index + 1; j < elemsnaps.snapshotLength; ++j) {
          var nextelem = elemsnaps.snapshotItem(j);
          nextelem.focus();
          if (document.activeElement == nextelem) {
            nextelem.scrollIntoView(false);
            return true;
          }
        }
        return false;
      };
      for (var i = 0; i < elemsnaps.snapshotLength; ++i) {
        var elem = elemsnaps.snapshotItem(i);
        if (elem == document.activeElement && focus_next(i)) {
          return;
        }
      }
      focus_next(-1);
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'FocusPrevElement',
  i18n: 'Focus on the previous input element',
  func: function(tab) {
  var exec = function() {
    var elemsnaps = document.evaluate(
        '//input[not(@type="hidden")]|//select|//textarea|//button',
        document.body, null, 7, null);
    var focus_prev = function(index) {
      for (var j = index - 1; j >= 0; --j) {
        var prevelem = elemsnaps.snapshotItem(j);
        prevelem.focus();
        if (document.activeElement == prevelem) {
          prevelem.scrollIntoView(false);
          return true;
        }
      }
      return false;
    };
    for (var i = elemsnaps.snapshotLength - 1; i >= 0; --i) {
      var elem = elemsnaps.snapshotItem(i);
      if (elem == document.activeElement && focus_prev(i)) {
        return;
        }
      }
      focus_prev(elemsnaps.snapshotLength);
    };
    return '(' + exec.toString() + ')()';
  }
}, {
  name: 'ScrollDown',
  i18n: 'Scroll down',
  description: 'Scroll down by $1 pixels',
  args: {
    'pixels': 'input'
  },
  func: function(tab, args) {
    var move = parseIntDefault(args[0], 30);
    return 'window.scrollBy(0, ' + move + ');';
  }
}, {
  name: 'ScrollUp',
  i18n: 'Scroll up',
  description: 'Scroll up by $1 pixels',
  args: {
    'pixels': 'input'
  },
  func: function(tab, args) {
    var move = -parseIntDefault(args[0], 30);
    return 'window.scrollBy(0, ' + move + ');';
  }
}, {
  name: 'ScrollLeft',
  i18n: 'Scroll left',
  description: 'Scroll left by $1 pixels',
  args: {
    'pixels': 'input'
  },
  func: function(tab, args) {
    var move = -parseIntDefault(args[0], 30);
    return 'window.scrollBy(' + move + ', 0);';
  }
}, {
  name: 'ScrollRight',
  i18n: 'Scroll right',
  description: 'Scroll left by $1 pixel',
  args: {
    'pixels': 'input'
  },
  func: function(tab, args) {
    var move = parseIntDefault(args[0], 30);
    return 'window.scrollBy(' + move + ', 0);';
  }
}, {
  name: 'ScrollToTop',
  i18n: 'Scroll to the top',
  func: function(tab) {
    return 'window.scrollTo(0,0);';
  }
}, {
  name: 'ScrollToBottom',
  i18n: 'Scroll to the bottom',
  func: function(tab) {
    return 'window.scrollTo(0, 2147483647);';
  }
}, {
  name: 'PageDown',
  i18n: 'Page down',
  func: function(tab) {
    return 'window.scrollBy(0, window.innerHeight);';
  }
}, {
  name: 'PageUp',
  i18n: 'Page up',
  func: function(tab) {
    return 'window.scrollBy(0, -window.innerHeight);';
  }
}, {
  name: 'Print',
  i18n: 'Print',
  func: function(tab) {
    return 'window.print();';
  }




}, {
  i18n: 'Cursor actions'
}, {
  name: 'InsertText',
  i18n: 'Insert free text at the cursor position',
  args: {
    'text or signature': 'textarea'
  },
  func: function(tab, args) {
    /**
     * Insert a text in the cursor position.
     * @param {string} text A text to be inserted.
     */
    var exec = function(text) {
      var sel = window.getSelection();
      for (var i = 0; i < sel.rangeCount; ++i) {
        var range = sel.getRangeAt(i);
        var elem = range.startContainer.childNodes[range.startOffset];
        if (elem) {
          // input or textarea
          var value = elem.value;
          var start = elem.selectionStart;
          var end = elem.selectionEnd;
          var newpos = start + text.length;
          elem.value = value.substr(0, start) + text + value.substr(end);
          elem.setSelectionRange(newpos, newpos);
        }
      }
    };
    return '(' + exec.toString() + ')(' + JSON.stringify(args[0]) + ');';
  }
}, {
  name: 'GoToLineHead',
  i18n: 'Go to head of a line',
  func: function(tabs) {
    var exec = function() {
      var range = window.getSelection().getRangeAt(0);
      var elem = range.startContainer.childNodes[range.startOffset];
      if (elem) {
        var value = elem.value;
        var start = elem.selectionStart;
        var pos = elem.value.lastIndexOf('\n', start - 1) + 1;
        elem.setSelectionRange(pos, pos);
      }
    };
    return '(' + exec.toString() + ')();';
  }
}, {
  name: 'GoToLineEnd',
  i18n: 'Go to end of a line',
  func: function(tabs) {
    var exec = function() {
      var range = window.getSelection().getRangeAt(0);
      var elem = range.startContainer.childNodes[range.startOffset];
      if (elem) {
        var value = elem.value;
        var start = elem.selectionStart;
        var pos = elem.value.indexOf('\n', start);
        if (pos < 0) {
          pos = elem.value.length;
        }
        elem.setSelectionRange(pos, pos);
      }
    };
    return '(' + exec.toString() + ')();';
  }




}, {
  i18n: 'Window actions'
}, {
  name: 'OpenNewWindow',
  i18n: 'Open a new window',
  func: function() {
    chrome.windows.create({
      'url': 'chrome://newtab/'
    });
  }
}, {
  name: 'CloseWindow',
  i18n: 'Close the current window',
  func: function(tab) {
    chrome.windows.remove(tab.windowId);
  }
}, {
  name: 'CloseAllWindows',
  i18n: 'Close all windows (Exit)',
  func: function(tab) {
    chrome.windows.getAll({populate: true},
    function(windows) {
      // Save all tabs.
      var win_url_array = [];
      for (var i = 0; i < windows.length; ++i) {
        var win = windows[i];
        var url_array = [];
        for (var j = 0; j < win.tabs.length; ++j) {
          url_array.push(win.tabs[j].url);
        }
        win_url_array.push(url_array);
      }
      localStorage.setItem('CloseAllWindows', JSON.stringify(win_url_array));

      for (i = 0; i < windows.length; ++i) {
        chrome.windows.remove(windows[i].id);
      }
    });
  }




}, {
  i18n: 'Screen Capture'
}, {
  name: 'CaptureVisibleTab',
  i18n: 'Capture the current tab',
  func: function(tab) {
    chrome.tabs.captureVisibleTab(tab.windowId, function(dataUrl) {
      chrome.tabs.create({
        'url': chrome.extension.getURL('capture.html?' +
                                       'url=' + encodeURIComponent(tab.url) +
                                       '&data=' + encodeURIComponent(dataUrl))
      });
    });
  }



}, {
  i18n: 'Open Chrome pages'
}, {
  name: 'OpenDownloads',
  i18n: 'Open Downloads',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://downloads/'
    });
  }
}, {
  name: 'OpenExtension',
  i18n: 'Open Extension',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://extensions/'
    });
  }
}, {
  name: 'OpenHistory',
  i18n: 'Open History',
  func: function(tab) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://history/'
    });
  }
}, {
  name: 'OpenOptionHtml',
  i18n: 'Open ShortcutManager',
  func: function(tab) {
    util.openOptionView();
  }
}
];

var BROWSER_ACTION_MAP = {};
for (var i = 0; i < BROWSER_ACTIONS.length; ++i) {
  if (BROWSER_ACTIONS[i].name) {
    BROWSER_ACTION_MAP[BROWSER_ACTIONS[i].name] = BROWSER_ACTIONS[i];
  }
}
