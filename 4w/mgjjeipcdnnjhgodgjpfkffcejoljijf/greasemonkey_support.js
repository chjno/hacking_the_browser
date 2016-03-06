/**
 * @fileoverview Reimplement Greasemonkey functions and add them to
 *     KeyMatcher class.
 */

/**
 * Wrapper function for GM_openInNewTab. Open a url in a new tab.
 * @param {string} url URL to be opened.
 */
KeyMatcher.prototype.GM_openInNewTab = function(url) {
  util.logging('GM_openInNewTab:' + url, 'gm');
  chrome.extension.sendRequest({
    'command': 'GM_openInNewTab',
    'url': url
  }, function() {});
};

/**
 * Wrapper function for GM_xmlhttpRequest.
 * @param {Object.<string, *>} request Object with the following keys:
 *     - "url" {string} : URL to be fetched.
 *     - "method" {string} : GET or POST.
 *     - "headers" {Object.<string, string>} : header key-value pairs.
 *     - "onload" {Function?} : Callback function for onload.
 *     - "onerror" {Function?} : Callback function for onerror.
 */
KeyMatcher.prototype.GM_xmlhttpRequest = function(request) {
  util.logging('GM_xmlhttpRequest:request', 'gm');
  util.logging(request, 'gm');

  var method = (/** @type {string} */ request['method']);
  var url = (/** @type {string} */ request['url']);
  var headers = (/** @type {Object.<string, string>|undefined} */
                 request['headers']);
  var data = (/** @type {string|undefined} */ request['data']);
  var onload = (/** @type {Function|undefined} */ request['onload']);
  var onerror = (/** @type {Function|undefined} */ request['onerror']);
  var onreadystatechange = (/** @type {Function|undefined} */
                            request['onreadystatechange']);

  var xhr = new MockXMLHttpRequest();
  if (onload) {
    xhr.onload = function() {
      onload({
        status: xhr.status,
        statusText: xhr.statusText,
        responseHeaders: xhr.getAllResponseHeaders(),
        responseText: xhr.responseText,
        readyState: undefined
      });
    };
  }
  if (onerror) {
    xhr.onerror = function() {
      onerror({
        status: xhr.status,
        statusText: xhr.statusText,
        responseHeaders: xhr.getAllResponseHeaders(),
        responseText: xhr.responseText,
        readyState: undefined
      });
    };
  }
  if (onreadystatechange) {
    xhr.onreadystatechange = function() {
      onreadystatechange({
        status: xhr.status,
        statusText: xhr.statusText,
        responseHeaders: xhr.getAllResponseHeaders(),
        responseText: xhr.responseText,
        readyState: xhr.readyState
      });
    };
  }
  xhr.open(method, url, true);
  if (headers) {
    for (var key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }
  xhr.send(data);
};

/**
 * Not implemented yet
 * @param {string} menuText Menu text to be shown.
 * @param {Function} callback Callback function.
 */
KeyMatcher.prototype.GM_registerMenuCommand = function(menuText, callback) {
};

/**
 * Wrapper function for GM_log.
 * @param {*} obj Any object.
 */
KeyMatcher.prototype.GM_log = function(obj) {
  console.log(obj);
};


/**
 * Wrapper function for GM_addStyle. The implementation is different from the
 * original Greasemonkey one.
 * @param {string} css CSS text.
 */
KeyMatcher.prototype.GM_addStyle = function(css) {
  util.logging('GM_addStyle:' + css);
  var style = document.styleSheets[document.styleSheets.length - 1];
  var cases = css.split(/(\})/g);
  for (var i = 0; i < cases.length; ++i) {
    if (i % 2 == 0 && i + 1 != cases.length) {
      var index = style.rules ? style.rules.length : 0;
      style.insertRule(cases[i] + '}', index);
    }
  }
};

/**
 * Wrapper function for GM_getValue for this instance.
 * @param {string} key Key string.
 * @param {string|undefined} opt_value The default value.
 * @return {string|undefined} The matched value.
 */
KeyMatcher.prototype.GM_getValue = function(key, opt_value) {
  var value = (this.localDataObj_[key] == undefined ?
               opt_value : (/** @type {string} */ this.localDataObj_[key]));
  util.logging('GM_getValue:' + key + ' : ' + value, 'gm');
  return value;
};

/**
 * Wrapper function for GM_setValue for this instance.
 * @param {string} key Key string.
 * @param {string} value Value string.
 */
KeyMatcher.prototype.GM_setValue = function(key, value) {
  util.logging('GM_setValue:' + key + '\n' + value, 'gm');
  this.localDataObj_[key] = value;
  // Send localDataObj_ to background.html and save it.
  chrome.extension.sendRequest({
    'command': 'GM_setValue',
    'value': JSON.stringify(this.localDataObj_),
    'id': this.data_.id
  }, function() {});
};

/**
 * Wrapper function for GM_deleteValue for this instance.
 * @param {string} key Key string.
 */
KeyMatcher.prototype.GM_deleteValue = function(key) {
  util.logging(key, 'gm');
  delete this.localDataObj_[key];
  // Send localDataObj_ to background.html and save it.
  chrome.extension.sendRequest({
    'command': 'GM_setValue',
    'value': JSON.stringify(this.localDataObj_),
    'id': this.data_.id
  }, function() {});
};

/**
 * Wrapper function for GM_listValues for this instance.
 * @return {Array.<string>} An array of registered keys.
 */
KeyMatcher.prototype.GM_listValues = function() {
  var retArray = [];
  for (var key in this.localDataObj_) {
    if (this.localDataObj_.__proto__[key] == undefined) {
      retArray.push(key);
    }
  }
  return retArray;
};

/**
 * Wrapper function for GM_getResourceText for this instance.
 * @param {string} name The name of the resource.
 * @return {string} The content of the resource.
 */
KeyMatcher.prototype.GM_getResourceText = function(name) {
  util.logging('GM_getResourceText:' + name, 'gm');
  if (this.data_.resource[name]) {
    return this.data_.resource[name].data;
  } else {
    return '';
  }
};

/**
 * Wrapper function for GM_getResourceURL for this instance.
 * @param {string} name The name of the resource.
 * @return {string} URI of the resource content.
 */
KeyMatcher.prototype.GM_getResourceURL = function(name) {
  util.logging('GM_getResourceURL:' + name, 'gm');
  if (this.data_.resource[name]) {
    return 'data:' + this.data_.resource[name].type + ';charset=utf-8,' +
      encodeURIComponent(this.data_.resource[name].data);
  } else {
    return '';
  }
};

/**
 * Note(jumpei): This code has the security hole. eval("this.chrome") can touch
 *     the "chrome" object. Need evalInSandbox().
 *
 * Executes the registered Javascript code in the Greasemonkey environment.
 * Prepare GM_* functions so that the code works nicely.
 * @private
 */
KeyMatcher.prototype.callFuncInGMContext_ = function() {
  (function(func,
            XMLHttpRequest,
            GM_openInNewTab,
            GM_xmlhttpRequest,
            GM_registerMenuCommand,
            GM_log,
            GM_addStyle,
            GM_getValue,
            GM_setValue,
            GM_deleteValue,
            GM_listValues,
            GM_getResourceText,
            GM_getResourceURL) {
    // Disable global variables.
    // TODO(jumpei) Cannot disable "util" becuase util is used above in this
    // function.
    var util = undefined;
    var keyutil = undefined;
    var format = undefined;
    var chrome = undefined;
    var KeyMatcher = undefined;
    var unsafeWindow = undefined;
    var MockXMLHttpRequest = undefined;

    // Firefox specific functions:
    Object.prototype.toSource = function() {
      return '(' + JSON.stringify(this) + ')';
    };

    // unimplemented functions in Chrome.
    var uneval = function() {
      throw new Error('uneval is not implemented on Chrome.');
    };

    eval(func);

    delete Object.prototype.toSource;

  })('(function() {' + this.data_.contents.join('\n') +
     this.data_.func + '})()',
     MockXMLHttpRequest,
     util.bind(this.GM_openInNewTab, this),
     util.bind(this.GM_xmlhttpRequest, this),
     util.bind(this.GM_registerMenuCommand, this),
     util.bind(this.GM_log, this),
     util.bind(this.GM_addStyle, this),
     util.bind(this.GM_getValue, this),
     util.bind(this.GM_setValue, this),
     util.bind(this.GM_deleteValue, this),
     util.bind(this.GM_listValues, this),
     util.bind(this.GM_getResourceText, this),
     util.bind(this.GM_getResourceURL, this));
};
