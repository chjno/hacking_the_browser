/**
 * @fileoverview Defines utility functions.
 */

// namespace
var util = {};

/**
 * Copied from closure-library-read-only/closure/goog/base.js.
 * See http://code.google.com/p/closure-library/source/checkout for more info.
 *
 * =================
 *
 * Partially applies this function to a particular 'this object' and zero or
 * more arguments. The result is a new function with some arguments of the first
 * function pre-filled and the value of |this| 'pre-specified'.<br><br>
 *
 * Remaining arguments specified at call-time are appended to the pre-
 * specified ones.<br><br>
 *
 * Also see: {@link #partial}.<br><br>
 *
 * Usage:
 * <pre>var barMethBound = bind(myFunction, myObj, 'arg1', 'arg2');
 * barMethBound('arg3', 'arg4');</pre>
 *
 * @param {Function} fn Target function.
 * @param {Object} context Specifies the object which |this| should
 *     point to when the function is run. If the value is null or undefined, it
 *     will default to the global object.
 * @param {*} var_args Additional arguments that are partially
 *     applied to the function.
 *
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 */
util.bind = function(fn, context, var_args) {
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      // Prepend the bound arguments to the current arguments.
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(context, newArgs);
    };

  } else {
    return function() {
      return fn.apply(context, arguments);
    };
  }
};


/**
 * @param {Number} opt_len The number of characters of the random id.
 * @return {string} Random ID string which matches /[0-9A-Za-z]{12}/.
 */
util.randomId = function(opt_len) {
  if (!opt_len) {
    opt_len = 12;
  }
  var str = '';
  for (var i = 0; i < opt_len; ++i) {
    var code = parseInt(Math.random() * 62, 10);
    if (code < 10) {
      // 0 ~ 9
      str += String.fromCharCode(code + 48);
    } else if (code < 36) {
      // A ~ Z
      str += String.fromCharCode(code - 10 + 65);
    } else {
      // a ~ z
      str += String.fromCharCode(code - 36 + 97);
    }
  }
  return str;
};

/**
 * @param {*} value The value to be logged.
 * @param {string?} opt_level If specified and util.logging.level[opt_level] is
 *     set, this value is logged. Otherwise it's not logged.
 */
util.logging = function(value, opt_level) {
  if (!opt_level || util.logging.level[opt_level]) {
    console.log(value);
  }
};

/**
 * Used for util.logging().
 * @type {Object.<string, boolean>}
 */
util.logging.level = {
  'bg': true
};
