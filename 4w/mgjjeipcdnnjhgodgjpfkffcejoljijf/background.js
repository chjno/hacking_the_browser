/**
 * @fileoverview Runs in background.html. It receives requests from content
 *     scripts or extension pages, and sends back to the page.
 */

/**
 * Convert format.SimpleShortcutData into a class for URL regexp match.
 * @param {format.SimpleShortcutData} simpleData The input SimpleShortcutData.
 * @constructor
 */
function UrlMatcher(simpleData) {
  /**
   * @type {format.SimpleShortcutData}
   * @private
   */
  this.simpleData_ = simpleData;

  /**
   * @type {Array.<boolean>}
   * @private
   */
  this.removals_ = [];

  /**
   * @type {Array.<RegExp>}
   * @private
   */
  this.urlregs_ = [];

  var lines = this.simpleData_.url.split('\n');
  for (var i = 0; i < lines.length; ++i) {
    var line = lines[i].replace(/^\s+|\s+$/g, '');
    if (!line) {
      continue;
    }
    if (line[0] == '-') {
      line = line.slice(1);
      this.removals_.push(true);
    } else {
      this.removals_.push(false);
    }
    this.urlregs_.push(
      new RegExp('^' + line.replace(/([-?+^$\\.{}\[\]])/g, '\\$1')
                           .replace(/\*/g, '.*') + '$'));
  }
};

/**
 * @return {string} Getter for this.id_
 */
UrlMatcher.prototype.id = function() {
  return this.simpleData_.id;
};

/**
 * @return {boolean} Getter for simpleData_.active.
 *     Returns true if the matcher is active.
 */
UrlMatcher.prototype.active = function() {
  return this.simpleData_.active;
};

/**
 * @param {string} url The input URL.
 * @return {boolean} Returns true if the URL matches the simpleData_.
 *     This does not care simpleData_.active.
 */
UrlMatcher.prototype.match = function(url) {
  var matched = false;
  for (var i = 0; i < this.urlregs_.length; ++i) {
    if (url.match(this.urlregs_[i])) {
      if (this.removals_[i]) {
        matched = false;
      } else {
        matched = true;
      }
    }
  }
  return matched;
};

/**
 * @return {format.SimpleShortcutData} Getter for this.simpleData_.
 */
UrlMatcher.prototype.simpleData = function() {
  return this.simpleData_;
};

/**
 * @return {format.DetailedShortcutData} Get the DetailedShortcutData of
 *    this.id() from localStorage.
 */
UrlMatcher.prototype.detailedData = function() {
  var detailed = new format.DetailedShortcutData(this.id());
  detailed.overwrite(this.simpleData_);
  return detailed;
};


/**
 * @constructor
 */
function ShortcutMatcher() {
  this.update();
}

/**
 * Read localStorage again and update inner variables.
 */
ShortcutMatcher.prototype.update = function() {
  // read from localStorage.
  var dataArray = new format.SimpleShortcutDataArray();
  /** @type {Array.<UrlMatcher>} */
  this.matcherArray_ = [];
  for (var i = 0; i < dataArray.array.length; ++i) {
    this.matcherArray_.push(new UrlMatcher(dataArray.array[i]));
  }
};

/**
 * Return a list of DetailedShortcutData that match the given URL. Not active
 * DetailedShortcutData are not added.
 * @param {string} url URL to be matched
 * @return {Array.<format.DetailedShortcutData>}
 */
ShortcutMatcher.prototype.matchDetailed = function(url) {
  var retValue = [];
  for (var i = 0; i < this.matcherArray_.length; ++i) {
    if (this.matcherArray_[i].match(url)) {
      retValue.push(this.matcherArray_[i].detailedData());
    }
  }
  return retValue;
};

/**
 * @param {Object} request The request object which has the following keys:
 *     "id": The ID of a SimpleShortcutData object.
 *     "value": The string value to be saved.
 */
ShortcutMatcher.prototype.GM_setValue = function(request) {
  // TODO(jumpei): the following code is a bit slow because 'func' is decoded and
  // then encoded.
  var json = localStorage.getItem(request['id']);
  var settingObj = (/** @type {Object.<string, *>} */ JSON.parse(json));
  /** @type {string} */
  settingObj['localData'] = request['value'];
  localStorage.setItem(request['id'], JSON.stringify(settingObj));
};

/**
 * Global variable.
 * @type {ShortcutMatcher}
 */
var matcher = new ShortcutMatcher();

/**
 * @constructor
 */
var TabShortcutManager = function() {
  /**
   * @type {Object.<Number, Object.<string, Array.<string>>>}
   * @private
   */
  this.map_ = {};
};

/**
 * @param {Number} tabid The tab id of the requested URL.
 * @param {string} url The requested URL.
 * @param {Array.<string>} shortcutIds Available shortcut ids on the URL.
 */
TabShortcutManager.prototype.registerShortcutIds = function(tabid, url,
                                                            shortcutIds) {
  if (this.map_[tabid] == undefined) {
    this.map_[tabid] = {};
  }
  url = url.replace(/#.+$/, '');
  this.map_[tabid][url] = shortcutIds;
  util.logging(this.map_);
};

/**
 * @param {Number} tabid Tab id.
 * @return {Object.<string, Array.<string>>} The object which maps from a url to
 *     available shortcut ids.
 */
TabShortcutManager.prototype.getUrlIdMap = function(tabid) {
  var urlIdMap = this.map_[tabid];
  return urlIdMap || {};
};

/**
 * Remove the tabid from the map. Called when a tab is refreshed or removed.
 * @param {Number} tabid Tab id.
 */
TabShortcutManager.prototype.removeTab = function(tabid) {
  delete this.map_[tabid];
};

/**
 * @param {Number} tabid Tab id.
 * @param {string} url URL you want to remove from the tab.
 */
TabShortcutManager.prototype.removeUrlFromMap = function(tabid, url) {
  url = url.replace(/#.+$/, '');
  if (this.map_[tabid]) {
    delete this.map_[tabid][url];
  }
};

var tabShortcutManager = new TabShortcutManager();

chrome.tabs.onRemoved.addListener(function(tabid) {
  util.logging('Removed ' + tabid, 'bg');
  tabShortcutManager.removeTab(tabid);
});

/**
 * @param {Object.<string, *>} request The request object.
 * @param {MessageSender} sender The MessageSender object.
 * @param {function(*?) : void} sendResponse The function to send back the
 *     response.
 */
var onRequestCallback = function(request, sender, sendResponse) {
  var command = (/** @type {string} */ request['command']);
  if (command == 'getShortcuts') {
    // This is a request from the content script (shortcut_manager.js).

    var url = (/** @type {string} */ request['url']);
    /** @type {Array.<format.DetailedShortcutData>} */
    var matchedDetailedPatterns = matcher.matchDetailed(url);

    if (matchedDetailedPatterns.length) {
      // Register the IDs of matched patterns into tabShortcutManager.
      var ids = [];
      for (var i = 0; i < matchedDetailedPatterns.length; ++i) {
        ids.push(matchedDetailedPatterns[i].id);
      }
      tabShortcutManager.registerShortcutIds(sender.tab.id, url, ids);
      sendResponse({
                     'id': request['id'],
                     'value': matchedDetailedPatterns
                   });
    } else {
      sendResponse(undefined);
    }
  } else if (command == 'getShortcutInTab') {
    var tabid = (/** @type {Number} */ request['tabid']);
    var urlIdMap = tabShortcutManager.getUrlIdMap(tabid);
    util.logging(urlIdMap, 'bg');
    sendResponse(urlIdMap);
  } else if (command == 'removeUrl') {
    var url = (/** @type {string} */ request['url']);
    tabShortcutManager.removeUrlFromMap(sender.tab.id, url);
    sendResponse(undefined);
  } else if (command == 'update') {
    matcher.update();
    sendResponse(undefined);
  } else if (command == 'GM_setValue') {
    matcher.GM_setValue(request);
    sendResponse(undefined);
  } else if (command == 'GM_openInNewTab') {
    var url = (/** @type {string} */ request['url']);
    chrome.tabs.create({
                         'url': url,
                         'selected': false
                       });
  } else {
    // Browser action command.
    var browserArgs = command.split('\n');
    var action = browserArgs[0];
    if (action in BROWSER_ACTION_MAP) {
      try {
        /** @type {string|undefined} */
        var returnString =
          BROWSER_ACTION_MAP[action]['func'](sender.tab,
                                             JSON.parse(browserArgs[1]));
        sendResponse(returnString);
      } catch(ex) {
        sendResponse('alert(' + ex.toString() + ')');
      }
    } else {
      sendResponse('Error: Not implemented: ' + command);
    }
  }
};

// The main function starts here.

(function()
{
  chrome.extension.onRequest.addListener(
    (/** @type {function(*, MessageSender, function(*?):void): void} */
      onRequestCallback));

  var xmlhttprequestObj = {};

  chrome.extension.onConnect.addListener(function(port) {
    if (port.name == 'XMLHttpRequest') {
      port.onMessage.addListener(function(msg)
      {
        if (msg['command'] == 'send') {
          var xhr = new XMLHttpRequest();
          var request = msg['request'];
          var randomId = msg['randomId'];
          xmlhttprequestObj[randomId] = xhr;
          if (request['open']) {
            xhr.open(request['open']['method'],
                     request['open']['url'],
                     request['open']['asyncFlag'],
                     request['open']['username'],
                     request['open']['password']);
          }
          if (request['setRequestHeader']) {
            for (var label in request['setRequestHeader']) {
              xhr.setRequestHeader(label, request['setRequestHeader'][label]);
            }
          }
          var updateState = function(state) {
            var res = {
              readyState: xhr.readyState,
              responseText: xhr.responseText,
              status: xhr.status,
              statusText: xhr.statusText,
              allResponseHeaders_: xhr.getAllResponseHeaders(),
              state: state,
              randomId: randomId
            };
            port.postMessage(res);
          };
          xhr.onreadystatechange = function() {
            updateState('onreadystatechange');
          };
          xhr.onload = function() {
            updateState('onload');
            delete xmlhttprequestObj[randomId];
            port.disconnect();
          };
          xhr.onerror = function() {
            updateState('onerror');
            delete xmlhttprequestObj[randomId];
            port.disconnect();
          };
          xhr.send(request['content']);
        } else if (msg['command'] == 'abort') {
          var randomId = msg['randomId'];
          if (xmlhttprequestObj[randomId]) {
            xmlhttprequestObj[randomId].abort();
            port.disconnect();
          }
        }
      });
    }
  });

  // If the browser action "CloseAllWindows" has saved the previous windows and
  // tabs state, restore them.
  var closeAllWindowsInfo = localStorage.getItem('CloseAllWindows');
  if (closeAllWindowsInfo) {
    var win_url_array = (/** @type {Array.<Array.<string>>} */
                         JSON.parse(closeAllWindowsInfo));
    util.logging(win_url_array, 'bg');
    for (var i = 0; i < win_url_array.length; ++i) {
      var url_array = win_url_array[i];
      if (url_array.length > 0) {
        var callbackForNewWindow = util.bind(function(array, win) {
          util.logging(array, 'bg');
          for (var k = 0; k < array.length; ++k) {
            chrome.tabs.create({
              windowId: win.id,
              url: array[k],
              selected: false
            });
          }
        }, this, url_array);
        if (i == 0) {
          // Append urls to a current window
          chrome.windows.getCurrent(callbackForNewWindow);
        } else {
          var url = url_array.shift();
          // Make a new window
          chrome.windows.create({
            url: url
          }, callbackForNewWindow);
        }
      }
    }
    localStorage.removeItem('CloseAllWindows');
  }
})();
