/**
 * @fileoverview Defines several struct classes used to save the key shortcut
 *     settings. This file only defines a minimal set of definitions.
 *     "data_format.js" will add more functions.
 */

// namespace
var format = {};

/**
 * This class stores all the necessary data for each shortcut settings. It is
 * saved to or loaded from localStorage.
 *
 * @param {string?} opt_id The default ID.
 * @constructor
 */
format.DetailedShortcutData = function(opt_id) {
  /**
   * The Id string of this shortcut action.
   * @type {string}
   */
  this.id = '';

  /**
   * The namespace string of this shortcut action.
   */
  this.namespace = '';

  /**
   * The name of this shortcut action.
   * @type {string}
   */
  this.name = '';

  /**
   * Whether or not this action is enabled.
   * @type {boolean}
   */
  this.active = true;

  /**
   * The url patterns concatinated with '\n'.
   * @type {string}
   */
  this.url = '*';

  /**
   * Shortcut key string such as "Alt+L", "Ctrl+Shift+M", "Q U I T", etc.
   * @type {string}
   */
  this.key = '';

  /**
   * Raw Javascript code to be executed.
   * @type {string}
   */
  this.func = '';

  /**
   * External JS URLs concatinated with '\n'
   * @type {string}
   */
  this.files = '';

  /**
   * External JS contents.
   * @type {Array.<string>}
   */
  this.contents = [];

  /**
   * @type {Object.<string, string>}
   */
  this.resource = {};

  /**
   * One of 'browser', 'user', or 'gm'.
   *   browser: Execute this.action.
   *   user: Execute this.func in the user level previledge.
   *   gm: Execute this.func in the Greasemonkey level previledge.
   * @type {string}
   */
  this.context = 'browser';

  /**
   * Only valid when this.context is 'browser'. The action string is written in
   * browser_action.js.
   */
  this.action = 'OpenAPage';

  /**
   * Used for GM_setValue or GM_getValue.
   * @type {string}
   */
  this.localData = '';

  // this.load() and this.init() are defined in data_format.js.
  if (opt_id) {
    this.load(opt_id);
  } else {
    this.init();
  }
};

/**
 * This does not overwrite 'id' field.
 */
format.DetailedShortcutData.prototype.init = function() {
  this.name = '';
  this.namespace = localStorage.getItem('namespace');
  this.active = true;
  this.url = '*';
  this.key = '';
  this.func = '';
  this.files = '';
  this.context = 'browser';
  this.action = 'OpenAPage';
  this.localData = '';
};

/**
 * Overwrite internal variables with obj.
 * @param {Object.<string, *>} obj An object instance.
 */
format.DetailedShortcutData.prototype.overwrite = function(obj) {
  for (var key in this) {
    if (obj[key] != undefined && !(obj[key] instanceof Function)) {
      this[key] = obj[key];
    }
  }
};
