/**
 * @fileoverview Runs at the end of options.html.
 */

/**
 * Shorthand for document.getElementById.
 * @param {string} id The id string of HTMLElement.
 * @return {HTMLElement} The HTMLElement of the id.
 */
function $(id) {
  var elem = document.getElementById(id);
  if (elem) {
    return elem;
  } else {
    throw new Error('$: Not found: ' + id);
  }
}


/**
 * @param {string?} opt_lastSelectedId If specified, select the option with the
 *     id.
 * @constructor
 */
function OptionView(opt_lastSelectedId) {
  this.table_ = $('manage_table');
  this.nameSelect_ = $('nameSelect');
  this.addButton_ = $('addButton');
  this.nameInput_ = $('name');
  this.urlTextarea_ = $('url');
  this.keyInput_ = (/** @type {HTMLInputElement} */ $('shortcut'));
  this.keyClearButton_ = $('keyclear');
  this.funcTextarea_ = $('func');
  this.localDataTextarea_ = $('localData');
  this.disableButton_ = $('disableButton');
  this.enableButton_ = $('enableButton');
  this.delButton_ = $('delButton');
  this.notsavedSpan_ = $('notsaved');
  this.saveButton_ = $('saveButton');
  this.filesTextarea_ = $('files');
  this.browserActionSelect_ = $('browserAction');
  this.browserContext_ = $('browserContext');
  this.userContext_ = $('userContext');
  this.shortcutErrorSpan_ = $('shortcutError');
  this.exportButton_ = $('export');
  this.exportCancel_ = $('exportCancel');
  this.codeTextarea_ = $('code');
  this.importButton_ = $('importButton');
  this.importSubDiv_ = $('importSubDiv');
  this.importTextarea_ = $('import');
  this.importDiv_ = $('importDiv');
  this.importDoneButton_ = $('importDone');
  this.funclistRadio_ = $('funclist');
  this.keylistRadio_ = $('keylist');

  this.mode_ = 'func';

  /**
   * @type {format.DetailedShortcutData}
   * @private
   */
  this.detailedData_ = new format.DetailedShortcutData();

  /**
   * @type {format.SimpleShortcutData}
   * @private
   */
  this.simpleData_ = new format.SimpleShortcutData();

  // Register browser actions from browser_action.js
  var optgroup = null;
  for (var i = 0; i < BROWSER_ACTIONS.length; ++i) {
    var action = BROWSER_ACTIONS[i];
    if (action.func) {
      var option = document.createElement('option');
      option.text = i18n.translate(action.i18n);
      option.value = action.name;
      optgroup.appendChild(option);
    } else {
      optgroup = document.createElement('optgroup');
      optgroup.label = i18n.translate(action.i18n);
      this.browserActionSelect_.appendChild(optgroup);
    }
  }

  // Read the saved settings from localStorage.
  this.settings_ = new format.SimpleShortcutDataArray();

  this.updateSettingOption(opt_lastSelectedId);

  // Register event handlers.
  this.nameSelect_.addEventListener(
    'change', util.bind(this.selectShortcut, this), false);
  this.nameInput_.addEventListener(
    'keyup', util.bind(this.onNameChange, this), false);
  this.urlTextarea_.addEventListener(
    'keyup', util.bind(this.onUrlChange, this), false);
  this.keyInput_.addEventListener(
    'keyup', util.bind(this.onKeyChange, this), false);
  this.keyInput_.addEventListener(
    'focus', util.bind(this.onKeyFocus, this), false);
  this.keyInput_.addEventListener(
    'blur', util.bind(this.onKeyBlur, this), false);
  this.keyClearButton_.addEventListener(
    'click', util.bind(this.keyClearClick, this), false);
  this.funcTextarea_.addEventListener(
    'keyup', util.bind(this.onFuncChange, this), false);
  this.filesTextarea_.addEventListener(
    'keyup', util.bind(this.onFilesChange, this), false);
  this.disableButton_.addEventListener(
    'click', util.bind(this.disableButtonClick, this), false);
  this.enableButton_.addEventListener(
    'click', util.bind(this.enableButtonClick, this), false);
  this.delButton_.addEventListener(
    'click', util.bind(this.delClick, this), false);
  this.browserActionSelect_.addEventListener(
    'change', util.bind(this.onBrowserActionChange, this), false);
  var onContextChange = util.bind(this.onContextChange, this);
  this.browserContext_.addEventListener(
    'change', onContextChange, false);
  this.userContext_.addEventListener(
    'change', onContextChange, false);
  this.saveButton_.addEventListener(
    'click', util.bind(this.onSaveClick, this), false);
  this.addButton_.addEventListener(
    'click', util.bind(this.addNewShortcut, this), false);
  this.exportButton_.addEventListener(
    'click', util.bind(this.exportClick, this), false);
  this.exportCancel_.addEventListener(
    'click', util.bind(this.exportCancel, this), false);
  this.importButton_.addEventListener(
    'click', util.bind(this.importButtonClick, this), false);
  this.importDoneButton_.addEventListener(
    'click', util.bind(this.importDoneClick, this), false);
  this.funclistRadio_.addEventListener(
    'change', util.bind(this.listModeChange, this), false);
  this.keylistRadio_.addEventListener(
    'change', util.bind(this.listModeChange, this), false);

  new keyutil.InputBoxListener(this.keyInput_,
                               util.bind(this.key, this),
                               util.bind(this.setKey, this));

  window.onbeforeunload = util.bind(function() {
    if (!this.saveButton_.disabled) {
      return OptionView.SAVE_WARNING;
    } else {
      return undefined;
    }
  }, this);

  window.addEventListener('keydown', util.bind(function(e) {
    if (e.ctrlKey && e.keyCode == 83 &&
        !e.shiftKey && !e.altKey && !e.metaKey) {
      // Ctrl+S
      window.setTimeout(util.bind(function() {
        this.onSaveClick();
      }, this), 300);
      e.preventDefault();
      return;
    }
    if (e.target.tagName == 'INPUT' ||
        e.target.tagName == 'TEXTAREA') {
      return;
    }
    if ((e.keyCode == 68 || e.keyCode == 46) &&
        !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // 'D' or 'DELETE'
      this.delClick();
    }
  }, this), false);
}

/**
 * Update the nameSelect_ option texts using this.settings_.
 * @param {string?} opt_lastSelectedId If specified, select the option with this
 *     id string. If not, select the first option element.
 */
OptionView.prototype.updateSettingOption = function(opt_lastSelectedId) {
  this.nameSelect_.innerHTML = '';
  // TODO(jumpei) array should be a private variable
  for (var i = 0; i < this.settings_.array.length; ++i) {
    var option = document.createElement('option');
    this.nameSelect_.appendChild(option);
    this.nameSelect_.size = (this.nameSelect_.options.length > 30 ?
                             30 : this.nameSelect_.options.length + 1);
    this.setOptionSetting_(this.settings_.array[i], option);
  }
  this.nameSelect_.selectedIndex = this.settings_.array.length - 1;
  this.selectId(opt_lastSelectedId);
  if (this.nameSelect_.options.length == 0) {
    this.addNewShortcut();
  } else {
    this.setSaved(true, false);
    this.selectShortcut();
  }
};

/**
 * Update the option element from the data in simpleData.
 * @param {format.SimpleShortcutData} simpleData The source data.
 * @param {HTMLOptionElement?} opt_option If specified, update the specified
 *     option element. If not specified, update the option element currently
 *     selected.
 * @private
 */
OptionView.prototype.setOptionSetting_ = function(simpleData, opt_option) {
  var option = (opt_option ? opt_option :
                this.nameSelect_.options[this.nameSelect_.selectedIndex]);
  option.text =
      (simpleData['key'] ? '[' + simpleData['key'] + ']: ': '') +
      simpleData['name'];
  option.id = simpleData['id'];
  option.style.color = simpleData['active'] ? 'black' : 'gray';
};

/**
 * Get the SimpleShortcutData which corresponds with the option element.
 * @param {HTMLOptionElement?} opt_option If not speicified, use the option
 *     element currently selected.
 * @return {format.SimpleShortcutData} simpleData Corresponding
 *     SimpleShortcutData.
 * @private
 */
OptionView.prototype.getOptionSetting_ = function(opt_option) {
  var option = (opt_option ? opt_option :
                this.nameSelect_.options[this.nameSelect_.selectedIndex]);
  return this.settings_.getById(option.id);
};

/**
 * @type {string} The message shown when a user leaves the setting unsaved.
 */
OptionView.SAVE_WARNING =
  [i18n.translate('Your setting change is not saved unless you click the "' +
                  i18n.translate('Save') + '" button.'),
   i18n.translate('Are you sure to abandon this change?'),
   i18n.translate('Click OK to abandon your change and move to other setting.'),
   i18n.translate('Click Cancel to stay here.')
  ].join('\n');

/**
 * @type {string} The message shown when the key box is empty.
 */
OptionView.EMPTY_STRING =
  i18n.translate('Type any shortcut key(s) here');

/**
 * @param {boolean} saved If true, hide "not saved" message. If false, show it.
 * @param {boolean} opt_doStore If true, save the all contents to localStorage.
 */
OptionView.prototype.setSaved = function(saved, opt_doStore) {
  if (saved) {
    if (opt_doStore) {
      if (this.shortcutErrorSpan_.style.color == 'red') {
        alert(this.shortcutErrorSpan_.innerHTML);
        return;
      }
      var name = this.name();
      if (!name) {
        alert(i18n.translate('Please write the description'));
        this.nameInput_.focus();
        return;
      }
      var url = this.url();
      if (!url) {
        alert(i18n.translate('Please specify URL pattern(s)'));
        this.urlTextarea_.focus();
        return;
      }

      this.simpleData_.overwrite({
        'name': name,
        'url': url,
        'key': this.key(),
        'active': this.active()
      });
      this.setOptionSetting_(this.simpleData_);

      this.detailedData_.overwrite(this.simpleData_);
      var context = this.context();

      this.detailedData_.overwrite({
        'func': this.func(),
        'files': this.files(),
        'localData': this.localData(),
        'action': this.browserAction(),
        'context': context,
        'contents': []
      });

      // detailedData_.save
      try {
        // Debug mode. If the codeTextarea_ is visible and filled,
        // use the data as 'func'. Do not load any files.
        if (this.code()) {
          this.detailedData_.overwrite({
            'files': ''
          });
        }
        this.detailedData_.save(util.bind(function()
        {
          this.setUrl(this.detailedData_.url);
          var code = this.code();
          if (code) {
            this.detailedData_.overwrite({
              'func': code,
              'contents': [],
              'context': 'gm'
            });
          } else if (this.detailedData_.context != 'browser') {
            this.setCode(this.detailedData_.contents.join('\n') +
                         this.detailedData_.func);
          }
          this.saveAll();
          this.saveButton_.disabled = true;
          this.notsavedSpan_.style.display = 'none';
          this.nameSelect_.focus();
        }, this));
      } catch (ex) {
        alert(ex);
      }
    } else {
      this.saveButton_.disabled = true;
      this.notsavedSpan_.style.display = 'none';
    }
  } else {
    this.saveButton_.disabled = false;
    this.notsavedSpan_.style.display = 'inline';
  }
};

/**
 * @return {boolean} Returns true if this setting is saved.
 */
OptionView.prototype.isSaved = function() {
  return this.saveButton_.disabled;
};

/**
 * Event handler for this.saveButton_.
 */
OptionView.prototype.onSaveClick = function() {
  if (this.mode_ == 'func') {
    this.setSaved(true, true);
  }
};

OptionView.prototype.saveAll = function() {
  var newArray = [];
  for (var i = 0; i < this.nameSelect_.options.length; ++i) {
    var id = this.nameSelect_.options[i].id;
    newArray.push(this.settings_.getById(id));
  }
  // TODO(jumpei) array should be a private variable.
  this.settings_.array = newArray;
  this.settings_.save();

  // Let the background page to update inner variables with new data.
  chrome.extension.sendRequest({
    'command': 'update'
  }, function(res) {});
};

/**
 * @param {string} value Setter for this.nameInput_.
 */
OptionView.prototype.setName = function(value) {
  this.nameInput_.value = value;
};

/**
 * @return {string} Getter for this.nameInput_.
 */
OptionView.prototype.name = function() {
  return this.nameInput_.value;
};

/**
 * Event listener for this.name
 */
OptionView.prototype.onNameChange = function() {
  this.setSaved(false);
};

/**
 * @param {string} value Setter for this.urlTextarea_.
 */
OptionView.prototype.setUrl = function(value) {
  if (this.urlTextarea_.value != value) {
    this.urlTextarea_.value = value;
    this.onUrlChange();
    this.setSaved(false);
  }
};

/**
 * @return {string} Getter for this.urlTextarea_.
 */
OptionView.prototype.url = function() {
  return this.urlTextarea_.value;
};

/**
 * Event listener for this.urlTextarea_. Update the number of rows.
 */
OptionView.prototype.onUrlChange = function() {
  var numLines = this.urlTextarea_.value.split('\n').length + 1;
  this.urlTextarea_.rows = numLines > 6 ? 6 : numLines;
  this.setSaved(false);
};

/**
 * @param {string} value Setter for this.keyInput_.
 */
OptionView.prototype.setKey = function(value) {
  this.setSaved(false);
  if (this.keyFocus_) {
    this.keyInput_.style.color = 'black';
    this.keyInput_.value = value;
  } else if (value) {
    this.keyInput_.style.color = 'black';
    this.keyInput_.value = value;
  } else {
    this.keyInput_.style.color = 'gray';
    this.keyInput_.value = OptionView.EMPTY_STRING;
  }
  var parseKeyObj = keyutil.parseKey(value);
  this.shortcutErrorSpan_.style.color = 'black';
  this.shortcutErrorSpan_.style.fontWeight = 'normal';
  if (parseKeyObj['error']) {
    this.shortcutErrorSpan_.innerHTML = parseKeyObj['error'];
    this.shortcutErrorSpan_.style.color = 'red';
  } else if (parseKeyObj['note']) {
    this.shortcutErrorSpan_.innerHTML =
      i18n.translate('Note') + ': ' + parseKeyObj['note'];
    this.shortcutErrorSpan_.style.color = 'blue';
  } else if (value == '') {
    this.shortcutErrorSpan_.style.color = 'red';
    this.shortcutErrorSpan_.innerHTML =
      i18n.translate('Please register a shortcut key for the browser action.');
  } else {
    this.shortcutErrorSpan_.innerHTML = '&nbsp;';
  }
};

/**
 * @return {string} Getter for this.keyInput_.
 */
OptionView.prototype.key = function() {
  if (this.keyFocus_) {
    return this.keyInput_.value;
  }
  if (this.keyInput_.value == OptionView.EMPTY_STRING) {
    return '';
  } else {
    return this.keyInput_.value;
  }
};

OptionView.prototype.onKeyChange = function() {
  var key = this.key();
  this.setKey(key);
};

OptionView.prototype.onKeyFocus = function() {
  var key = this.key();
  this.keyFocus_ = true;
  this.setKey(key);
};

OptionView.prototype.onKeyBlur = function() {
  var key = this.key();
  this.keyFocus_ = false;
  this.setKey(key);
};

OptionView.prototype.keyClearClick = function() {
  this.setKey('');
  this.onKeyChange();
};

/**
 * @param {string} value Setter for this.funcTextarea_.
 */
OptionView.prototype.setFunc = function(value) {
  if (this.funcTextarea_.value != value) {
    this.funcTextarea_.value = value;
    this.setSaved(false);
  }
};

/**
 * @return {string} Getter for this.funcTextarea_.
 */
OptionView.prototype.func = function() {
  return this.funcTextarea_.value;
};

/**
 * Event listener for this.funcTextarea_
 */
OptionView.prototype.onFuncChange = function() {
  this.setSaved(false);
};

/**
 * @param {string} value Setter for this.filesTextarea_.
 */
OptionView.prototype.setFiles = function(value) {
  if (this.filesTextarea_.value != value) {
    this.filesTextarea_.value = value;
    this.onFilesChange();
    this.setSaved(false);
  }
};

/**
 * @return {string} Getter for this.filesTextarea_.
 */
OptionView.prototype.files = function() {
  return this.filesTextarea_.value;
};

/**
 * Event listerner for this.filesTextarea_. Update the number of rows.
 */
OptionView.prototype.onFilesChange = function() {
  var numLines = this.filesTextarea_.value.split('\n').length + 1;
  this.filesTextarea_.rows = numLines > 6 ? 6 : numLines;
  this.setSaved(false);
};

/**
 * @param {string} value
 */
OptionView.prototype.setCode = function(value) {
  this.codeTextarea_.value = value;
};

/**
 * @return {string}
 */
OptionView.prototype.code = function() {
  if (this.codeTextarea_.style.display == 'none') {
    return '';
  } else {
    return this.codeTextarea_.value;
  }
};

/**
 * @param {string} value Setter for localData.
 */
OptionView.prototype.setLocalData = function(value) {
  if (this.localDataTextarea_.value != value) {
    this.localDataTextarea_.value = value;
    this.setSaved(false);
  }
};

/**
 * @return {string} Getter for localData.
 */
OptionView.prototype.localData = function() {
  return this.localDataTextarea_.value;
};

/**
 * @param {string} context Setter for context. One of "browser" or "user".
 */
OptionView.prototype.setContext = function(context) {
  this.browserContext_.checked = (context == 'browser');
  this.userContext_.checked = (context == 'user');
  if (this.browserContext_.checked) {
    this.browserContext_.parentNode.className = '';
    this.userContext_.parentNode.className = 'disabled';
    this.onBrowserActionChange();
  } else {
    this.browserContext_.parentNode.className = 'disabled';
    this.userContext_.parentNode.className = '';
  }
  this.setKey(this.key());
  this.setSaved(false);
};

/**
 * @return {string} One of "browser" or "user".
 */
OptionView.prototype.context = function() {
  if (this.browserContext_.checked) {
    return 'browser';
  } else {
    return 'user';
  }
};

/**
 * Event listener for context.
 */
OptionView.prototype.onContextChange = function() {
  this.setContext(this.context());
  if (this.context() == 'user') {
    this.setName('');
  }
};

/**
 * Event listener for browser action arg elements.
 */
OptionView.prototype.onBrowserActionArgChange = function() {
  window.setTimeout(util.bind(this.updateName_, this), 0);
  this.setSaved(false);
};

/**
 * @param {string} value Setter for browserAction.
 */
OptionView.prototype.setBrowserAction = function(value) {
  if (!value) {
    value = BROWSER_ACTIONS[1]['name'];
  }
  /** @type {Array.<string>} */
  var actionAndArgs = value.split('\n');
  var action = actionAndArgs.shift();
  this.browserActionSelect_.value = action;
  var userArgs = actionAndArgs.length ?
    (/** @type {Array.<string>} */ JSON.parse(actionAndArgs[0])) : [];
  /** @type {Object.<string, string>} */
  var args = BROWSER_ACTION_MAP[action]['args'] || {};
  var i = 0;
  for (var key in args) {
    var div = $('arg' + i);
    div.innerHTML = '';
    var span = document.createElement('span');
    span.innerHTML = key + ':';
    span.style.verticalAlign = 'top';
    div.appendChild(span);
    var input = document.createElement(args[key]);
    if (args[key] == 'textarea') {
      input.style.minHeight = '4em';
    } else if (args[key] == 'input') {
      input.type = 'text';
    }
    input.style.width = '70%';
    if (i < userArgs.length) {
      input.value = userArgs[i];
    }
    input.addEventListener('keypress',
                           util.bind(this.onBrowserActionArgChange, this),
                           false);
    div.appendChild(input);
    i++;
  }
  for (; i < 2; ++i) {
    var div = $('arg' + i);
    div.innerHTML = '';
  }
  if (this.context() == 'browser') {
    this.updateName_();
  }
  this.setSaved(false);
};

/**
 * Update the name box when a user selects the browser context or changes the
 * browser action args.
 * @private
 */
OptionView.prototype.updateName_ = function() {
  var action = BROWSER_ACTION_MAP[this.browserActionSelect_.value];
  var englishDescription =
      (action.description ? action.description : action.i18n);
  var args = [];
  for (var i = 0; i < 2; ++i) {
    var div = $('arg' + i);
    if (div.childNodes && div.childNodes.length >= 2) {
      args.push(div.childNodes[1].value);
    } else {
      args.push('');
    }
  }
  englishDescription =
    englishDescription.replace('$1', args[0]).replace('$2', args[1]);
  this.setName(
    i18n.translate(englishDescription));
};

/**
 * @return {string} Getter for browserAction.
 */
OptionView.prototype.browserAction = function() {
  var action = this.browserActionSelect_.value;
  /** @type {Object.<string, string>} */
  var argsMap = (BROWSER_ACTION_MAP[action]['args'] || {});
  var args = [];
  var i = 0;
  for (var key in argsMap) {
    var div = $('arg' + i);
    if (div && div.childNodes.length >= 2) {
      var input = div.childNodes[1];
      args.push(input.value);
    }
    i++;
  }
  return action + '\n' + JSON.stringify(args);
};

/**
 * Event listener for browserAction
 */
OptionView.prototype.onBrowserActionChange = function() {
  if (this.browserActionSelect_.value ==
      this.detailedData_.action.split('\n')[0]) {
    this.setBrowserAction(this.detailedData_.action);
  } else {
    this.setBrowserAction(this.browserActionSelect_.value);
  }
};

/**
 * @param {boolean} isActive Setter for active.
 */
OptionView.prototype.setActive = function(isActive) {
  if (this.active() == isActive) {
    return;
  }
  var elems = [this.nameInput_, this.urlTextarea_,
               this.keyInput_, this.filesTextarea_, this.funcTextarea_];
  for (var i = 0; i < elems.length; ++i) {
    var elem = elems[i];
    if (isActive) {
      elem.removeAttribute('readonly');
    } else {
      elem.setAttribute('readonly', '1');
    }
  }
  this.disableButton_.style.display = (isActive ? '' : 'none');
  this.enableButton_.style.display = (isActive ? 'none': '');
  this.setSaved(false);
};

/**
 * @return {boolean} Getter for active.
 */
OptionView.prototype.active = function() {
  return this.disableButton_.style.display == '';
};

OptionView.prototype.setListMode = function(value) {
  if (value == 'key') {
    this.keylistRadio_.checked = true;
  } else {
    this.funclistRadio_.checked = true;
  }
  this.listModeChange();
};

OptionView.prototype.listModeChange = function() {
  if (this.funclistRadio_.checked) {
    this.modeChange('func');
  } else {
    this.modeChange('key');
  }
};


OptionView.prototype.disableButtonClick = function() {
  this.setActive(false);
};

OptionView.prototype.enableButtonClick = function() {
  this.setActive(true);
};

OptionView.prototype.delClick = function() {
  if (this.mode_ != 'func') {
    return;
  }
  if (confirm(i18n.translate('Are you sure to delete "' +
                             this.name() + '"?'))) {
    var selectedIndex = this.nameSelect_.selectedIndex;
    var option = this.nameSelect_.options[selectedIndex];
    localStorage.removeItem(option.id);
    var newSelectedIndex = selectedIndex == 0 ? 0 : selectedIndex - 1;
    this.nameSelect_.removeChild(option);
    this.nameSelect_.selectedIndex = newSelectedIndex;
    this.setSaved(true, false);
    this.saveAll();
    if (this.nameSelect_.options.length == 0) {
      this.addNewShortcut();
    } else {
      this.selectShortcut();
    }
  }
};

/**
 * Add a new setting to the bottom of the select box.
 */
OptionView.prototype.addNewShortcut = function() {
  if (this.mode_ != 'func') {
    return;
  }
  // If the current setting is not saved, confirm if it's ok to abandon the
  // unsaved setting.
  if (!this.isSaved() && !confirm(OptionView.SAVE_WARNING)) {
    return;
  }
  var option = document.createElement('option');
  this.nameSelect_.appendChild(option);
  this.nameSelect_.size = (this.nameSelect_.options.length > 30 ?
                           30 : this.nameSelect_.options.length + 1);
  var simpleData = this.settings_.generateNewData();
  var id = simpleData.id;
  this.setOptionSetting_(simpleData, option);
  // Focus the new settings.
  this.nameSelect_.selectedIndex = this.nameSelect_.options.length - 1;
  this.setSaved(true, /** doStore = */ false);
  this.selectShortcut();
};

/**
 * @param {string?} opt_id If specified, the option with the id is selected.
 *     Otherwise this function has no effect.
 */
OptionView.prototype.selectId = function(opt_id) {
  if (!opt_id) {
    return;
  }
  for (var i = 0; i < this.nameSelect_.options.length; ++i) {
    if (i == 0 || this.nameSelect_.options[i].id == opt_id) {
      this.nameSelect_.selectedIndex = i;
    }
  }
};

/**
 * Replace the input or textarea values with the current selected setting.
 */
OptionView.prototype.selectShortcut = function() {
  if (this.mode_ != 'func') {
    return;
  }
  if (!this.isSaved() && !confirm(OptionView.SAVE_WARNING)) {
    // Focus the previous setting.
    this.selectId(localStorage.getItem('lastSelectedId'));
    return;
  }
  this.nameSelect_.focus();

  // Update input and textarea values.
  this.simpleData_ = this.getOptionSetting_();
  var id = this.simpleData_['id'];
  this.detailedData_.load(id);
  this.detailedData_.overwrite(this.simpleData_);
  localStorage.setItem('lastSelectedId', id);

  this.setName(this.detailedData_.name);
  this.setUrl(this.detailedData_.url);
  this.setKey(this.detailedData_.key);
  this.setFunc(this.detailedData_.func);
  this.setFiles(this.detailedData_.files);
  this.setLocalData(this.detailedData_.localData);
  this.setContext(this.detailedData_.context);
  this.setBrowserAction(this.detailedData_.action);

  this.setActive(this.detailedData_['active']);
  this.setSaved(this.detailedData_.exists());
};

OptionView.prototype.importButtonClick = function() {
  this.importSubDiv_.style.display =
    (this.importSubDiv_.style.display == 'none' ? '' : 'none');
};

OptionView.prototype.importDoneClick = function() {
  var code = this.importTextarea_.value;
  if (code.indexOf('http://') == 0 || code.indexOf('https://') == 0) {
    var url = code.split('\n')[0];
    // URL is specified.
    chrome.extension.sendRequest({
      'command': 'GM_xmlhttpRequest',
      'request': {
        'url': url,
        'method': 'GET'
      }
    },
    util.bind(function(res) {
      if (res.status != 200) {
        alert(i18n.translate('Failure in import') + ':\n' +
              i18n.translate('Could not load: ' + url));
      } else {
        this.importFromString(res.responseText);
      }
    }, this));
  } else {
    this.importFromString(code);
  }
};

OptionView.prototype.importFromString = function(code) {
  this.settings_.importJSList(code, util.bind(function() {
    this.updateSettingOption();
    this.saveAll();
    this.importSubDiv_.style.display = 'none';
  }, this));
};

OptionView.prototype.exportClick = function() {
  if (this.mode_ == 'export') {
    // export -> func

    // Extract selected options and make a JS data file using export.html.
    var jss = [];
    for (var i = 0; i < this.nameSelect_.options.length; ++i) {
      var option = this.nameSelect_.options[i];
      if (option.selected) {
        jss.push((new format.DetailedShortcutData(option.id)).toExportJS());
      }
    }
    var code = jss.join('\n\n');
    chrome.tabs.create({
      'url': chrome.extension.getURL('export.html?code=' +
                                     encodeURIComponent(code))
    });
    this.modeChange('func');
  } else {
    // func -> export
    this.modeChange('export');
  }
};

OptionView.prototype.exportCancel = function() {
  // export -> func
  this.modeChange('func');
};

OptionView.prototype.modeChange = function(newmode) {
  if (this.mode_ == newmode) {
    return;
  }
  if (this.mode_ == 'func') {
    if (!this.isSaved() && !confirm(OptionView.SAVE_WARNING)) {
      this.setListMode('func');
      return;
    }
  }

  this.mode_ = newmode;

  var leftside = $('left');
  var rightside = $('rightside');
  var exportMessage = $('exportMessage');
  var funclistDiv = $('funclistDiv');
  var settingDiv = $('settingDiv');
  var keylistDiv = $('keylistDiv');

  if (this.mode_ == 'export') {
    this.addButton_.style.display = 'none';
    this.exportCancel_.style.display = 'inline';
    this.importDiv_.style.display = 'none';
    this.nameSelect_.setAttribute('multiple', 'multiple');
    exportMessage.style.display = 'block';
    funclistDiv.style.display = '';
    keylistDiv.style.display = 'none';
    leftside.style.width = '100%';
    rightside.style.display = 'none';
    settingDiv.style.display = '';
  } else if (this.mode_ == 'func') {
    this.addButton_.style.display = '';
    this.exportCancel_.style.display = 'none';
    this.importDiv_.style.display = '';
    this.nameSelect_.removeAttribute('multiple');
    exportMessage.style.display = 'none';
    keylistDiv.style.display = 'none';
    funclistDiv.style.display = '';
    leftside.style.width = '30%';
    rightside.style.display = '';
    settingDiv.style.display = '';

    this.nameSelect_.selectedIndex = 0;
    this.selectShortcut();
  } else if (this.mode_ == 'key') {
    this.addButton_.style.display = 'none';
    this.exportCancel_.style.display = 'none';
    this.importDiv_.style.display = 'none';
    this.nameSelect_.removeAttribute('multiple');
    funclistDiv.style.display = 'none';
    keylistDiv.style.display = '';
    settingDiv.style.display = 'none';
    leftside.style.width = '30%';
    rightside.style.display = 'none';
    this.showKeylist();
  }
};

OptionView.prototype.showKeylist = function() {
  var table = $('keylistTable');
  // TODO(jumpei): array should be a private variable.
  table.innerHTML = '';
  table.insertRow(-1).innerHTML =
    '<th colspan=5 class=section>Always executed:</th>';
  table.insertRow(-1).innerHTML =
    '<th>Key</th><th>Name</th>' +
    '<th>URL patterns</th><th nowrap>Edit</th>';
  for (var i = 0; i < this.settings_.array.length; ++i) {
    var simpleData = this.settings_.array[i];
    if (simpleData.key == '') {
      table.insertRow(-1).innerHTML =
        '<td>' +
        ['',
         util.safehtml(simpleData.name),
         simpleData.url.replace(/\n/g, '<br>')].join('</td><td>') +
        '</td>' +
        '<td select="' + simpleData.id + '"><img src="edit.png"/></td>';
    }
  }
  table.insertRow(-1).innerHTML =
    '<th colspan=5 class=section>User defined keys:</th>';
  table.insertRow(-1).innerHTML =
    '<th>Key</th><th>Name</th>' +
    '<th>URL patterns</th><th>Edit</th>';
  var keyArray = [];
  for (i = 0; i < this.settings_.array.length; ++i) {
    var simpleData = this.settings_.array[i];
    if (simpleData.key) {
      keyArray.push(simpleData);
    }
  }
  var sortfunc = function(a, b) {
    var as = a.key.split(' ').length;
    var bs = b.key.split(' ').length;
    if (as > bs) {
      return 1;
    } else if (as < bs) {
      return -1;
    }

    var al = a.key.split('+').length;
    var bl = b.key.split('+').length;
    if (al > bl) {
      return 1;
    } else if (al < bl) {
      return -1;
    }

    return (a.key > b.key ? 1 : -1);
  };
  keyArray.sort(sortfunc);
  for (i = 0; i < keyArray.length; ++i) {
    table.insertRow(-1).innerHTML =
      '<td>' +
      [util.safehtml(keyArray[i].key),
       util.safehtml(keyArray[i].name),
       keyArray[i].url.replace(/\n/g, '<br>')].join('</td><td>') +
      '</td>' +
      '<td select="' + keyArray[i].id + '"><img src="edit.png"/></td>';
  }
  keyArray = [];
  for (var key in keyutil.strongBindingObj) {
    keyArray.push({
      key: key,
      name: keyutil.strongBindingObj[key],
      canEdit: true
    });
  }
  for (key in keyutil.weakBindingObj) {
    keyArray.push({
      key: key,
      name: keyutil.weakBindingObj[key],
      canEdit: false
    });
  }
  table.insertRow(-1).innerHTML =
    '<th colspan=5 class=section>' +
    '<a target="_blank" ' +
    'href="http://www.google.com/support/chrome/bin/answer.py?answer=95743">' +
    'Browser default keys</a>:</th>';
  table.insertRow(-1).innerHTML =
    '<th>Key</th><th colspan=2>Name</th><th>Edit</th>';
  keyArray.sort(sortfunc);
  for (i = 0; i < keyArray.length; ++i) {
    table.insertRow(-1).innerHTML =
      '<td>' + util.safehtml(keyArray[i].key) + '</td>' +
      '<td colspan=2>' + i18n.translate(keyArray[i].name) + '</td>' +
      '<td>' + (keyArray[i].canEdit ? '' : '<img src="edit.png"/>') +
      '</td>';
  }

  var tds = util.xpath7(table, './/img/..');
  for (i = 0; i < tds.snapshotLength; ++i) {
    var td = tds.snapshotItem(i);
    td.style.cursor = 'pointer';
    td.title = i18n.translate('Edit this shortcut key');
    var callback = util.bind(function(td, event)
    {
      var id = td.getAttribute('select');
      if (id) {
        this.setListMode('func');
        this.selectId(id);
        this.selectShortcut();
      } else {
        var key = td.parentNode.firstChild.firstChild.nodeValue;
        this.setListMode('func');
        this.addNewShortcut();
        this.setName('My ' + key);
        this.setKey(key);
        this.setUrl('*');
        this.setFunc('// ' +
                     i18n.translate('If you write nothing, [' + key +
                                    '] is disabled'));
      }
    }, this, td);
    td.addEventListener('click', callback, false);
  }
  var ths = util.xpath6(table, './/th');
  for (i = 0; i < ths.snapshotLength; ++i) {
    var th = ths.snapshotItem(i);
    th.textContent = i18n.translate(th.textContent);
  }
};

(function() {
   var selectedId = '';
   if (window.location.search.match(/[?&]id=([^&]+)/)) {
     selectedId = decodeURIComponent(RegExp.$1);
   } else {
     selectedId = localStorage.getItem('lastSelectedId');
   }
   new OptionView(selectedId);

   i18n.addLanguagePreferenceToSelect(
     (/** @type {HTMLSelectElement} */ $('langs')));

})();
