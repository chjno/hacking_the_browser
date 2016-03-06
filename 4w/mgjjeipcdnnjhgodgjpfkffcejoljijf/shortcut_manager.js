/**
 * @fileoverview The main content script. This script is run at "document_start"
 *     timing before DOMContentLoaded.
 */

/**
 * Given a DetailedShortcutData, register onkeypress and onkeydown event
 * handlers and triggers the registered function when a user types the matched
 * key stroke.
 * @param {format.DetailedShortcutData} data DetailedShortcutData instance
 *     returned from background.html.
 * @constructor
 */
function KeyMatcher(data) {
  /**
   * @type {format.DetailedShortcutData}
   * @private
   */
  this.data_ = data;

  var parseKeyObj = keyutil.parseKey(this.data_.key);
  if (parseKeyObj['error']) {
    throw new Error(parseKeyObj['error']);
  }

  /**
   * @type {Array.<Object>}
   * @private
   */
  this.matchObjArray_ = parseKeyObj['array'];

  /**
   * @type {boolean}
   * @private
   */
  this.isVisible_ = parseKeyObj['isVisible'];

  util.logging(JSON.stringify(this.matchObjArray_), 'key');
  util.logging(this.isVisible_, 'key');

  /**
   * @type {Number}
   * @private
   */
  this.index_ = 0;

  /**
   * @type {Number?}
   * @private
   */
  this.timer_ = null;

  /**
   * @type {Number}
   * @private
   */
  this.keyCount_ = 0;

  /**
   * @type {Object.<string, string>}
   * @private
   */
  this.localDataObj_ = (/** @type {Object.<string, string>} */
                        JSON.parse(this.data_.localData || '{}'));

  if (!this.data_.active) {
    return;
  }

  if (!this.hasKey()) {
    // The key stroke specified as empty. This was supported in 2009, but
    // was removed in 2016.
    window.console.error('ShortcutManager: the feature to execute Javascript for no key JS was removed in ver0.8.0');
  }
}

/**
 * @type {string}
 */
KeyMatcher.timing = 'document_start';

window.addEventListener('DOMContentLoaded', function() {
  KeyMatcher.timing = 'document_end';
}, false);

window.addEventListener('load', function() {
  KeyMatcher.timing = 'document_idle';
}, false);

/**
 * @return {boolean} True if the key is specified.
 */
KeyMatcher.prototype.hasKey = function() {
  return this.matchObjArray_.length > 0;
};

/**
 * Called when a user types the registered key stroke. Executes the registered
 * Javascript code or browser action according to this.data_.context.
 * @private
 */
KeyMatcher.prototype.callFunc_ = function() {
  util.logging(this.data_.context, 'gm');
  if (this.data_.context == 'browser') {
    chrome.extension.sendRequest({
      'command': this.data_.action,
      'id': this.data_.id
    }, function(res) {
      res = (/** @type {string|undefined} */ res);
      if (res) {
        var script = document.createElement('script');
        script.textContent = res;
        document.body.appendChild(script);
        document.body.removeChild(script);
      }
    });
  } else if (this.data_.context == 'user' || this.data_.context == 'gm') {
    // In order to execute Javascript in the user page context, use
    // a script tag.
    var func = this.data_.func;
    if (func.substr(0, 11) == 'javascript:') {
      func = decodeURIComponent(func.substr(11));
    }
    func =
      '(function() {try{' + this.data_.contents.join('\n') + func +
        '}catch(ex){alert("ShortcutManager: Error in \\"' + this.data_.name +
        '\\"\\n" + ex)}})()';
    util.logging(func, 'key');
    var script = document.createElement('script');
    script.textContent = func;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }
};

/**
 * Callback function for a keydown event.
 * @param {Event} e Keydown event.
 */
KeyMatcher.prototype.consumeKeydown = function(e) {
  this.keydownCode_ = e.keyCode;
  if (this.keydownCode_ == 16 ||
      this.keydownCode_ == 17 ||
      this.keydownCode_ == 18) {
    return;
  }
  if (e.ctrlKey || e.altKey || e.metaKey ||
      keyutil.isInvisibleKeyCode(this.keydownCode_)) {
    this.keyCount_ += 2;
  } else {
    this.keyCount_ += 1;
  }
  util.logging('kd: ' + this.keyCount_, 'key2');
  if (this.keyCount_ >= 2) {
    this.consume_(e);
  }
};

/**
 * Callback function for a keypress event.
 * @param {Event} e Keypress event.
 */
KeyMatcher.prototype.consumeKeypress = function(e) {
  this.keypressCode_ = e.keyCode;
  this.keyCount_ += 1;
  util.logging('kp: ' + this.keyCount_, 'key2');
  if (this.keyCount_ >= 2) {
    this.consume_(e);
  }
};

/**
 * Called when both keydown event and keypress event are triggered. Check if
 * the current pushed key matches the registered key stroke.
 * @param {Event} e keypress event or keydown event.
 * @private
 */
KeyMatcher.prototype.consume_ = function(e) {
  var keydown = this.keydownCode_;
  var keypress = this.keypressCode_;
  this.keydownCode_ = 0;
  this.keypressCode_ = 0;
  this.keyCount_ = 0;

  var target = e.target;
  if (this.isVisible_) {
    if (target.tagName == 'TEXTAREA' ||
        target.tagName == 'SELECT' ||
        (target.tagName == 'INPUT' &&
         (target.type == '' || target.type.toUpperCase() == 'TEXT' ||
          target.type.toUpperCase() == 'PASSWORD' ||
          target.type.toUpperCase() == 'SEARCH'))) {
      return;
    }
  }

  util.logging(keydown + ' ' + keypress, 'key2');
  if (this.timer_) {
    window.clearTimeout(this.timer_);
  }
  var charObj = this.matchObjArray_[this.index_];
  if (!keyutil.matchOneKey(charObj, keydown, keypress,
                           e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)) {
    this.index_ = 0;
    util.logging('index:0', 'key2');
    return;
  }
  // The key matched charObj.
  this.index_++;
  util.logging('index:' + this.index_, 'key2');
  if (this.index_ == this.matchObjArray_.length) {
    // A user typed all the key strokes. Execute the registered function.
    this.index_ = 0;
    util.logging('callFunc', 'key');
    e.preventDefault();
    e.stopPropagation();
    this.callFunc_();
    return;
  }

  // After 700 millisecs, the key strokes is cleared.
  this.timer_ = window.setTimeout(util.bind(function() {
    this.index_ = 0;
    util.logging('index:0', 'key2');
  }, this), 700);
};

/**
 * A set of KeyMatcher. This class is supposed to be instantiated only once.
 * @constructor
 */
function KeyMatcherManager() {
  /**
   * @type {Array.<KeyMatcher>}
   * @private
   */
  this.keymatchers_ = [];

  /**
   * @type {Array.<format.DetailedShortcutData>}
   * @private
   */
  this.detailedDataArray_ = [];

  window.addEventListener(
    'keydown', util.bind(this.consumeKeydown, this), true);
  window.addEventListener(
    'keypress', util.bind(this.consumeKeypress, this), true);
}

/**
 * Initialize or update keymatchers_ via detailedDataArray.
 * @param {Array.<format.DetailedShortcutData>} detailedDataArray An
 *     array of detailedDataArray which is returned from background.html.
 */
KeyMatcherManager.prototype.update = function(detailedDataArray) {
  // Clear the results.
  this.keymatchers_ = [];

  this.detailedDataArray_ = detailedDataArray;

  for (var i = 0; i < detailedDataArray.length; ++i) {
    var data = detailedDataArray[i];
    // Only register active ones.
    if (data.active) {
      try {
        var matcher = new KeyMatcher(data);
        if (matcher.hasKey()) {
          this.keymatchers_.push(matcher);
        }
      } catch (ex) {
        alert('Shortcut Manager: Error:\n' + ex);
      }
    }
  }
};

/**
 * Pass the keydown event object to all KeyMatchers.
 * @param {Event} e 'keydown' event object.
 */
KeyMatcherManager.prototype.consumeKeydown = function(e) {
  for (var i = 0; i < this.keymatchers_.length; ++i) {
    this.keymatchers_[i].consumeKeydown(e);
  }
};

/**
 * Pass the keypress event object to all KeyMatchers.
 * @param {Event} e 'keypress' event object.
 */
KeyMatcherManager.prototype.consumeKeypress = function(e) {
  for (var i = 0; i < this.keymatchers_.length; ++i) {
    this.keymatchers_[i].consumeKeypress(e);
  }
};

/**
 * @return {Array.<format.DetailedShortcutData>} Getter for
 *     this.detailedDataArray_.
 */
KeyMatcherManager.prototype.detailedDataArray = function() {
  return this.detailedDataArray_;
};

var keyMatcherManager = new KeyMatcherManager();

// The main function begins here.
chrome.extension.sendRequest({
  'command': 'getShortcuts',
  'url': window.location.href
}, function(response) {
  response = (/** @type {Object.<string, *>?} */ response);
  if (!response) {
    // undefined is returned, which means url does not match any shortcuts.
    return;
  }
  var results = (/** @type {Array.<format.DetailedShortcutData>} */
                 response['value']);
  keyMatcherManager.update(results);
});

window.addEventListener('unload', function() {
  chrome.extension.sendRequest({
    'command': 'removeUrl',
    'url': window.location.href
  }, function(res) {});
}, false);
