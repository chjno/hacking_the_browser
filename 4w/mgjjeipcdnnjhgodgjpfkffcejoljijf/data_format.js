/**
 * @fileoverview This JS script adds more functions to the following classes
 *    defined in data_format_light.js:
 *      - format.DetailedShortcutData
 *    It also defines the following classes:
 *      - format.SimpleShortcutData
 *      - format.SimpleShortcutDataArray.
 */

/**
 * Resolve the relative path.
 * For example, if the base is 'http://www.foo.com/a/b/c.html',
 *   path: './d.html' -> 'http://www.foo.com/a/b/d.html'
 *         '../d.html' -> 'http://www.foo.com/a/d.html'
 *         '/d.html' -> 'http://www.foo.com/d.html'
 *         'http://bar.com/d.html' -> 'http://bar.com/d.html'
 * @param {string} path Absolute or relative path.
 * @param {string} base The base URL.
 * @return {string} Absolute URL.
 */
format.pathToURL = function(path, base) { return ''; };

window.addEventListener('DOMContentLoaded', function() {
  format.pathToURL = (function() {
    var work = document.createElement('iframe');
    work.style.display = 'none';
    document.body.appendChild(work);
    var wdoc = work.contentWindow.document;
    return function(path, base){
      wdoc.open();
      wdoc.write('<head><base href="' + base +
                 '" \/><\/head><body><a href="' + path + '"></a><\/body>');
      wdoc.close();
      return wdoc.getElementsByTagName('a')[0].href;
    };
  })();
}, false);

/**
 * A static function to convert <[!CDATA[ ... ]]> in Javascript code to a
 * string. On Firefox, this script is correctly recognized while Chrome throws
 * an error with "Unexpected token <".
 *
 * For example, if a script is like this:
 *    GM_addStyle(<><!CDATA[
 *      div {
 *        display:none;
 *      }
 *    ]]</>);
 * It is converted into
 *    GM_addStyle("\n  div {\n    display:none;\n  }\n");
 *
 * @param {string} code Javascript string.
 * @return {string} Converted Javascript string.
 */
format.convertCDATA = function(code) {
  var cdataRe = /(<.*?><!\[CDATA\[|\]\]><\/.*?>)/g;
  var finalCode = '';
  var insideCDATA = false;
  for (var match = null, lastIndex = 0; (match = cdataRe.exec(code)); ) {
    if (insideCDATA) {
      finalCode += JSON.stringify(code.substring(lastIndex, match.index));
    } else {
      finalCode += code.substring(lastIndex, match.index);
    }
    lastIndex = cdataRe.lastIndex;
    if (match[0].indexOf('CDATA') > 0) {
      insideCDATA = true;
    } else {
      insideCDATA = false;
    }
  }
  finalCode += code.substring(lastIndex);
  return finalCode;
};

/**
 * Load DetailedShortcutData which is stored in localStorage.
 * @param {string} id The ID string.
 */
format.DetailedShortcutData.prototype.load = function(id) {
  // TODO(jumpei): Need error handling?
  var data = localStorage.getItem(id);
  if (data) {
    this.overwrite((/** @type {Object.<string, *>} */ JSON.parse(data)));
  } else {
    this.id = id;
    this.init();
  }
};

/**
 * @param {function(boolean) : void} callback Called when the save is done or
 *     failed. If succeeded, true is passed to the callback. Otherwise false is
 *     passed.
 */
format.DetailedShortcutData.prototype.save = function(callback) {
  if ((this.context == 'user' || this.context == 'gm') && this.files) {
    // Load external files.
    this.contents = [];
    this.resource = {};
    this.error_ = '';
    /** @type {Array.<string>} */
    var unloadedFiles = this.files.split('\n');

    /** @type {function(string) : void} */
    var loadFileCallback = util.bind(function(errorString) {
      // If an error occurred during loading files, errorString is not empty.
      if (errorString) {
        alert(errorString);
        callback(false);
      } else {
        localStorage.setItem(this.id, JSON.stringify(this));
        delete this.error_;
        callback(true);
      }
    }, this);
    this.loadFiles_(unloadedFiles, loadFileCallback);
  } else {
    localStorage.setItem(this.id, JSON.stringify(this));
    callback(true);
  }
};

/**
 * @param {Array.<string>} unloadedFiles The list of URLs which will be loaded.
 * @param {function(string): void} callback Callback function. If some error
 *     occurred, the error message is passed to the argument. Otherwise, '' is
 *     passed.
 * @private
 */
format.DetailedShortcutData.prototype.loadFiles_ = function(unloadedFiles,
                                                            callback) {
  if (unloadedFiles.length == 0) {
    // All files are loaded.
    callback('');
    return;
  }
  // Load the last file.
  var file = unloadedFiles.pop().replace(/^\s+|\s+$/g, '');
  if (!file) {
    // Skip this empty line.
    this.loadFiles_(unloadedFiles, callback);
    return;
  }
  var resource = file.split(' ');
  var name = '';
  if (resource.length == 2) {
    name = resource[0];
    file = resource[1];
  }
  var xhr = new MockXMLHttpRequest;
  var xhrCallback = util.bind(function()
  {
    console.log('loaded: ' + xhr.status + ' : ' + file);
    if (xhr.status != 200) {
      // Skip loading all the rest files.
      callback(i18n.translate('Failure in save') + ':\n' +
               i18n.translate('Could not load: ' + file));
      return;
    }

    // The fetch succeeded. Store the code in this.contents.
    // Process CDATA section in the Javascript code.
    var code = format.convertCDATA(xhr.responseText);

    // If the JS file is a Greasemonkey script, process the following:
    // (1) find @require tags and push URLs to this.unloadedFiles_ queue.
    // (2) find @include and @exclude tags and reconstruct this.url.
    // (3) find @resource tags and store data in this.resource.
    if (file.match(/\.user\.js$/) && this.contents.length == 0) {
      var userScriptRe = /^\/\/\s*==(\/)?UserScript==/;
      var requireRe = /^\/\/\s*@require\s+(\S+)/;
      var includeRe = /^\/\/\s*@include\s+(\S+)/;
      var excludeRe = /^\/\/\s*@exclude\s+(\S+)/;
      var resourceRe = /^\/\/\s*@resource\s+(\S+)\s+(\S+)/;
      var lines = code.split('\n');
      var insideUserScript = false;
      var urls = [];
      for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];
        if (line.match(userScriptRe)) {
          insideUserScript = (RegExp.$1 != '/');
        } else if (insideUserScript) {
          if (line.match(requireRe)) {
            unloadedFiles.push(format.pathToURL(RegExp.$1, file));
          } else if (line.match(includeRe)) {
            urls.push(RegExp.$1);
          } else if (line.match(excludeRe)) {
            urls.push('-' + RegExp.$1);
          } else if (line.match(resourceRe)) {
            unloadedFiles.push(RegExp.$1 + ' ' +
                               format.pathToURL(RegExp.$2, file));
          }
        }
      }
      if (urls.length) {
        var url = urls.join('\n');
        if (this.url != url) {
          var message =
              i18n.translate('Greasemonkey specifies the following ' +
                             'URL patterns') + ':\n' + url + '\n\n' +
              i18n.translate('Your URL patterns are as follows') +
              ':\n' + this.url + '\n\n' +
              i18n.translate('Do you overwrite the URL patterns?');
          if (confirm(message)) {
            this.url = url;
          }
        }
      }
    }  // end of if the file is .user.js
    this.contents.unshift(code);

    var type = '';
    if (xhr.getAllResponseHeaders().match(/Content-Type:\s*(.+)/i)) {
      type = RegExp.$1;
    }
    this.resource[name] = {
      type: type,
      data: xhr.responseText
    };
    this.loadFiles_(unloadedFiles, callback);
  }, this);  // end of the callback.
  xhr.onload = xhrCallback;
  xhr.onerror = xhrCallback;

  console.log('Loading:' + file);
  xhr.open('GET', file);
  xhr.send();
};

/**
 * @return {boolean} True if this.id is already saved in localStorage.
 */
format.DetailedShortcutData.prototype.exists = function() {
  return !!localStorage.getItem(this.id);
};

/**
 * @return {string} Convert this DetailedShortcutData into a string.
 *
 * The string looks like this:
 *
 *   // ==UserScript==
 *   // (OPTIONS)
 *   // ==/UserScript==
 *   (YOUR JAVASCRIPT CODE)
 *
 * OPITONS are as follows:
 *
 * "@ShortcutManager" : Always required just after "// ==UserScript=="
 * "@name" : The name of the shortcut.
 * "@namespace" : The username, which is a random string with 12 characters.
 * "@key" : The key stroke which triggers this shortcut.
 * "@include" : if a URL matches this pattern, the action is executed.
 * "@exclude" : if a URL matches this pattern, the action is not executed.
 * "@require" : an external JS file is executed when the shortcut fires.
 * "@execute" : a browser action is executed when the shortcut fires.
 */
format.DetailedShortcutData.prototype.toExportJS = function() {
  var jss = ['// ==UserScript=='];
  jss.push('// @ShortcutManager');
  jss.push('// @name ' + this.name);
  jss.push('// @namespace ' + this.namespace);
  jss.push('// @key ' + this.key);
  var urls = this.url.split('\n');
  for (var i = 0; i < urls.length; ++i) {
    if (!urls[i]) {
      continue;
    }
    if (urls[i][0] == '-') {
      jss.push('// @exclude ' + urls[i].slice(1));
    } else {
      jss.push('// @include ' + urls[i]);
    }
  }
  var files = this.files.split('\n');
  for (i = 0; i < files.length; ++i) {
    if (files[i]) {
      jss.push('// @require ' + files[i]);
    }
  }
  if (this.context == 'browser') {
    var args = this.action.split('\n');
    jss.push('// @execute ' + args.shift() + '(' + args + ')');
  }
  jss.push('// ==/UserScript==');
  if (this.context != 'browser') {
    jss.push(this.func);
  }

  return jss.join('\n');
};

/**
 * From the import code, update the inner variables. This does not validate the
 * value.
 * @param {string} code The JS data file which does not include
 *     "// ==UserScript" but includes "// ==/UserScript" and its main JS code.
 */
format.DetailedShortcutData.prototype.importJS = function(code) {
  var endRe = /^\/\/\s*==\/UserScript==\s*/gm;
  endRe.lastIndex = 0;
  var sections = [];
  var match = endRe.exec(code);
  if (!match) {
    throw new Error('Could not find \"// ==/UserScript=="');
  }
  var headers = code.substring(0, match.index).split('\n');
  code = code.substring(endRe.lastIndex);

  var headerRe = /^\/\/\s*@(\S+)\s+(.*?)\s*$/;
  var urls = [];
  var files = [];
  this.init();
  this.context = 'user';
  this.action = '';
  for (var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    if (header.match(headerRe)) {
      if (RegExp.$1 == 'name') {
        this.name = RegExp.$2;
      } else if (RegExp.$1 == 'namespace') {
        this.namespace = RegExp.$2;
      } else if (RegExp.$1 == 'key') {
        this.key = RegExp.$2;
      } else if (RegExp.$1 == 'include') {
        urls.push(RegExp.$2);
      } else if (RegExp.$1 == 'exclude') {
        urls.push('-' + RegExp.$2);
      } else if (RegExp.$1 == 'require') {
        files.push(RegExp.$2);
      } else if (RegExp.$1 == 'execute') {
        var command = RegExp.$2;
        if (command.match(/^(.*?)\((.*)\)$/)) {
          this.action = RegExp.$1 + '\n' + RegExp.$2;
          this.context = 'browser';
        } else {
          throw new Error('Unexpected @execute command: ' + command);
        }
      }
    }
  }
  this.url = urls.join('\n');
  this.files = files.join('\n');
  this.func = code;
};


/**
 * @param {Object?} opt_obj If present, initialize internal variables with this
 *     object.
 * @constructor
 */
format.SimpleShortcutData = function(opt_obj) {
  /**
   * @type {string}
   */
  this.id = '';

  /**
   * @type {string}
   */
  this.name = '';

  /**
   * URL pattern string concatinated by '\n'.
   * @type {string}
   */
  this.url = '';

  /**
   * @type {string}
   */
  this.key = '';

  /**
   * @type {boolean}
   */
  this.active = true;

  this.init();

  if (opt_obj) {
    this.overwrite(opt_obj);
  }
};

/**
 * Init the internal variables with the default values.
 */
format.SimpleShortcutData.prototype.init = function() {
  this.name = i18n.translate('New shortcut');
  this.namespace = localStorage.getItem('namespace');
  this.url = '*';
  this.key = '';
  this.active = true;
};

/**
 * @param {Object} obj The object used to update the member variables.
 */
format.SimpleShortcutData.prototype.overwrite = function(obj) {
  for (var key in this) {
    if (obj[key] != undefined && !(obj[key] instanceof Function)) {
      this[key] = obj[key];
    }
  }
};

/**
 * @constructor
 */
format.SimpleShortcutDataArray = function() {
  /**
   * @type {Array.<format.SimpleShortcutData>}
   */
  this.array = [];

  this.load();
};

/**
 * Load the registered SimpleShortcutData array from localStorage.
 */
format.SimpleShortcutDataArray.prototype.load = function() {
  var array = (/** @type {Array.<Object>} */
                JSON.parse(localStorage.getItem('ids') || '[]'));
  var simpleArray = [];
  for (var i = 0; i < array.length; ++i) {
    // Convert obejct to SimpleShortcutData.
    simpleArray.push(new format.SimpleShortcutData(array[i]));
  }
  this.array = simpleArray;
};

/**
 * @param {string} id The id of SimpleShortcutData.
 * @return {format.SimpleShortcutData?} Return SimpleShortcutData if found.
 */
format.SimpleShortcutDataArray.prototype.getById = function(id) {
  for (var i = 0; i < this.array.length; ++i) {
    if (this.array[i].id == id) {
      return this.array[i];
    }
  }
  return null;
};

/**
 * @return {string} Unique ID.
 */
format.SimpleShortcutDataArray.prototype.getNewId = function() {
  while (true) {
    var matched = false;
    var id = util.randomId(8);
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].id == id) {
        continue;
      }
    }
    return id;
  }
};

/**
 * @return {format.SimpleShortcutData} Create new SimpleShortcutData with a new
 *    id. This SimpleShortcutData is not saved at this moment.
 */
format.SimpleShortcutDataArray.prototype.generateNewData = function() {
  var simpleData = new format.SimpleShortcutData({
    'id': this.getNewId()
  });
  this.array.push(simpleData);
  return simpleData;
};

/**
 * Convert the array of SimpleShortcutData into a JSON string and save it into
 * localStorage.
 */
format.SimpleShortcutDataArray.prototype.save = function() {
  localStorage.setItem('ids', JSON.stringify(this.array));
};

/**
 * @param {string} code The import string.
 * @param {Function} callback Called when the import was done.
 */
format.SimpleShortcutDataArray.prototype.importJSList = function(code,
                                                                 callback) {
  // The comment part of the shortcut manager always looks like this;
  //
  //   // ==UserScript==
  //   // @ShortcutManager
  //   // @... ...
  //   // @... ...
  //   // ==/UserScript==
  //
  var userScriptRe = /\/\/\s+==UserScript==\s*\n\/\/\s*@ShortcutManager/gm;
  var insideData = false;
  /** @type {Array.<format.DetailedShortcutData>} */
  var newData = [];
  for (var match = null, lastIndex = 0; (match = userScriptRe.exec(code)); ) {
    if (insideData) {
      newData.push(this.convertOneJs_(code.substring(lastIndex, match.index)));
    }
    insideData = true;
    lastIndex = userScriptRe.lastIndex;
  }
  if (insideData) {
    newData.push(this.convertOneJs_(code.substring(lastIndex)));
  }

  var existingNames = [];
  var newDataNames = [];
  for (var i = 0; i < newData.length; ++i) {
    if (newData[i].id) {
      existingNames.push(newData[i].name);
    } else {
      newDataNames.push(newData[i].name);
    }
  }
  var message = '';
  if (newDataNames.length) {
    message +=
      i18n.translate('Installing the following ' + newDataNames.length +
                     ' new patterns') + ':\n  ' +
      newDataNames.join('\n  ') + '\n';
  }
  if (existingNames.length) {
    message +=
      i18n.translate('Overwriting the following ' + existingNames.length +
                     ' patterns') + ':\n  ' +
      existingNames.join('\n  ') + '\n';
  }
  if (message && confirm(message)) {
    this.saveNewData_(newData, callback);
  } else {
    alert(i18n.translate('No valid import data.'));
  }
};

/**
 * Save newly imported data.
 * @param {Array.<format.DetailedShortcutData>} newData The array of new data
 *     which a user wants to save.
 * @param {Function} callback Called when saving data finishes successfully.
 * @private
 */
format.SimpleShortcutDataArray.prototype.saveNewData_ = function(newData,
                                                                 callback) {
  if (newData.length == 0) {
    this.save();
    callback();
    return;
  }
  // Try to save one DetailedShortcutData. Then call saveNewData_() again.

  /** @type {format.DetailedShortcutData} */
  var detailedData = newData.shift();
  if (!detailedData.id) {
    detailedData.id = this.getNewId();
  }

  /** @type {function(boolean): void} */
  var saveCallback = util.bind(function(detailedData, isSaved) {
    // isSaved is true if the detailedData is saved to localStorage.
    if (isSaved) {
      var simpleData = this.getById(detailedData.id);
      if (simpleData == null) {
        simpleData = new format.SimpleShortcutData({
          'id': detailedData.id
        });
        this.array.push(simpleData);
      }
      simpleData.overwrite(detailedData);
    }
    // If detailedData was not saved, skip registering it
    this.saveNewData_(newData, callback);
  }, this, detailedData);
  detailedData.save(saveCallback);
};

/**
 * Convert the string made by toExportJS() into a DetailedShortcutData object.
 * If a user already has had a shortcut setting with the same name and the
 * same namespace, the converted object has the same id. Otherwise, the
 * converted has an empty id.
 *
 * @param {string} code The string made by toExportJS().
 * @return {format.DetailedShortcutData} The converted DetailedShortcutData
 *    object.
 * @private
 */
format.SimpleShortcutDataArray.prototype.convertOneJs_ = function(code) {
  var detailedData = new format.DetailedShortcutData();
  detailedData.importJS(code);

  // define the id of detailedData.
  var id = '';
  for (var i = 0; i < this.array.length; ++i) {
    if (this.array[i].name == detailedData.name &&
        this.array[i].namespace == detailedData.namespace) {
      var simpleData = this.array[i];
      id = this.array[i].id;
      detailedData.id = id;
    }
  }
  return detailedData;
};

/**
 * For debugging purpose. Remove all keys with 8 characters.
 */
format.SimpleShortcutDataArray.clearNotUsed = function() {
  var simpleArray = new format.SimpleShortcutDataArray();
  for (var key in localStorage) {
    if (key.length == 8 && !simpleArray.getById(key)) {
      console.log('Cleared ' + key);
      localStorage.removeItem(key);
    }
  }
};

(function() {
  var namespace = localStorage.getItem('namespace');
  if (!namespace) {
    localStorage.setItem('namespace', util.randomId(12));
  }
})();
