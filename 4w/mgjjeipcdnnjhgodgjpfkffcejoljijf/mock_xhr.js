/**
 * @fileoverview Reimplementation of XHR.
 */

/**
 * If you declare XMLHttpRequest not in the background context,
 * you can only fetch the contents in the browser domain.
 * This class allows the cross domain XHR using background.js.
 * @constructor
 */
var MockXMLHttpRequest = function() {
  /**
   * This port is opened until XMLHttpRequest finishes. In order to prevent a
   * user from accessing this port, this is declared as an internal variable.
   * @type {Port}
   */
  var port = chrome.extension.connect({
    'name': 'XMLHttpRequest'
  });

  /** @type {Number} */
  this.readyState = 0;
  /** @type {string} */
  this.responseText = '';
  /** @type {Number} */
  this.status = 0;
  /** @type {string} */
  this.statusText = '';

  /** @type {Function|undefined} */
  this.onreadystatechange = undefined;

  /** @type {Function|undefined} */
  this.onload = undefined;

  /** @type {Function|undefined} */
  this.onerror = undefined;

  /**
   * @type {string|undefined}
   * @private
   */
  this.allResponseHeaders_ = undefined;

  this.randomId_ = util.randomId(4);

  /**
   * @type {Object.<string, *>}
   * @private
   */
  this.requestObj_ = {
    'source': window.location.href,
    'randomId': this.randomId_
  };

  port.onMessage.addListener(util.bind(function(msg) {
    this.updateInternalState_(msg);
  }, this));

  /**
   * Abort the XMLHttpRequest.
   * This function is not prototyped because 'port' is an inner variable.
   */
  this.abort = util.bind(function() {
    port.postMessage({
      'command': 'abort',
      'randomId': this.randomId_
    });
  }, this);

  /**
   * Send the data to the URL and start XMLHttpRequest.
   * @param {string|undefined} opt_content content to be sent to the url.
   */
  this.send = util.bind(function(opt_content) {
    this.requestObj_['send'] = opt_content;
    // Send the info of requestObj_ to background.html via this.port_.
    port.postMessage({
      'command': 'send',
      'randomId': this.randomId_,
      'request': this.requestObj_
    });
  }, this);
};

/**
 * @param {Object.<string, *>} msg The XHR object.
 * @private
 */
MockXMLHttpRequest.prototype.updateInternalState_ = function(msg) {
  if (msg['randomId'] != this.randomId_) {
    return;
  }
  this.readyState = (/** @type {Number} */ msg['readyState']);
  this.responseText = (/** @type {string} */ msg['responseText']);
  this.status = (/** @type {Number} */ msg['status']);
  this.statusText = (/** @type {string} */ msg['statusText']);
  this.allResponseHeaders_ = (/** @type {string} */ msg['allResponseHeaders_']);
  var state = msg['state'];
  if (state && this[state]) {
    this[state]();
  }
};

/**
 * @return {string} All response headers.
 */
MockXMLHttpRequest.prototype.getAllResponseHeaders = function() {
  return this.allResponseHeaders_ || '';
};

/**
 * @param {string} headerLabel A header name.
 * @return {string} Header value.
 */
MockXMLHttpRequest.prototype.getResponeHeader = function(headerLabel) {
  var re = new RegExp(headerLabel.replace(/([-?+*^\\.{}\(\)\[\]])/g, '\\$1') +
                      ':\\s*(.+)', 'i');
  if (this.allResponseHeaders_.match(re)) {
    return RegExp.$1;
  } else {
    return '';
  }
};

/**
 * @param {string} method HTTP method.
 * @param {string} url URL string.
 * @param {boolean?} opt_asyncFlag If true or not present, do XMLHttpRequest
 *     asynchronously.
 * @param {string?} opt_username A user name used for login.
 * @param {string?} opt_password A password used for login.
 */
MockXMLHttpRequest.prototype.open = function(method, url, opt_asyncFlag,
                                             opt_username, opt_password) {
  this.requestObj_['open'] = {
    method: method,
    url: url,
    asyncFlag: (opt_asyncFlag == undefined ? true : !!opt_asyncFlag),
    username: opt_username,
    password: opt_password
  };
};

/**
 * @param {string} label Request header label.
 * @param {string} value Corresponding value.
 */
MockXMLHttpRequest.prototype.setRequestHeader = function(label, value) {
  var obj = (/** @type {Object?} */ this.requestObj_['setRequestHeader']);
  if (!obj) {
    obj = this.requestObj_['setRequestHeader'] = {};
  }
  obj[label] = value;
};
