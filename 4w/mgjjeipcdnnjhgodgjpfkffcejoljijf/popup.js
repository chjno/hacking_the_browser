/**
 * @fileoverview Runs on the last of popup.html.
 */
var table = document.getElementById('table');
var urlSelect = document.getElementById('urls');
var headerDiv = document.getElementById('header');
var errorDiv = document.getElementById('error');
var noresultDiv = document.getElementById('noresult');
var footerDiv = document.getElementById('footer');

/** @type {Object.<string, Array.<string>>} */
var urlIdMap = {};

/**
 * Add urls in the current page to the select box.
 */
function showAvailableUrls() {
  for (var url in urlIdMap) {
    var option = document.createElement('option');
    option.text = url;
    option.value = url;
    urlSelect.appendChild(option);
  }
  urlSelect.addEventListener('change', function(e) {
    showAvailableShortcuts();
  }, false);
  urlSelect.selectedIndex = 0;
  if (urlSelect.options.length == 0) {
    headerDiv.style.display = 'none';
    table.style.display = 'none';
    noresultDiv.style.display = 'block';
    footerDiv.style.display = 'block';
  } else {
    showAvailableShortcuts();
    headerDiv.style.display = 'block';
    table.style.display = 'block';
    noresultDiv.style.display = 'none';
    footerDiv.style.display = 'block';
  }
}

/**
 * Show the available shorcuts of the currently selected URL.
 */
function showAvailableShortcuts() {
  var ids = urlIdMap[urlSelect.value] || [];
  table.innerHTML = '';
  var row = table.insertRow(-1);
  row.innerHTML =
    '<th>Key</th><th>Name</th><th>Edit</th>';
  row = table.insertRow(-1);

  for (var i = 0; i < ids.length; ++i) {
    var result = new format.DetailedShortcutData(ids[i]);

    row = table.insertRow(-1);
    if (result.active) {
      row.className = 'enabled';
    } else {
      row.className = 'disabled';
    }
    row.title = i18n.translate('Click to disable/enable it');
    row.id  = result.id;
    row.innerHTML =
      '<td>' + (util.safehtml(result.key) || 'Always') + '</td>' +
      '<td>' + util.safehtml(result.name) + '</td>' +
      '<td title="' + i18n.translate('Edit this shortcut key') + '">' +
      '<img src="edit.png"/></td>';

    row.addEventListener('click',
      /**
       * @this {HTMLTableRowElement}
       */
      function(e) {
        e.stopPropagation();
        var enabled = this.className == 'enabled';
        this.className = enabled ? 'disabled' : 'enabled';
        var simpleDataArray = new format.SimpleShortcutDataArray();
        var simpleData = simpleDataArray.getById(this.id);
        if (simpleData) {
          simpleData.overwrite({ 'active': !enabled });
        } else {
          throw new Error('Not found: shortcut id: ' + this.id);
        }
        simpleDataArray.save();

        var detailedData = new format.DetailedShortcutData(this.id);
        detailedData.overwrite({ 'active': !enabled});
        detailedData.save(function(isSaved) {
          // Let the background page to update inner variables with new data.
          chrome.extension.sendRequest({
            'command': 'update'
          }, function(res) {});
        });
      }, false);
    util.xpath9(row, './td[3]').addEventListener('click',
      /**
       * @this {HTMLTableRowElement}
       */
      function(e) {
        var id = this.parentNode.id;
        e.stopPropagation();
        chrome.tabs.create({
          'url': chrome.extension.getURL('options.html?id=' +
                                         encodeURIComponent(id))
        });
      }, true);
  }
};

document.getElementById('option').addEventListener('click', function() {
  util.openOptionView();
}, false);

chrome.tabs.getSelected(null, function(tab) {
  chrome.extension.sendRequest({
    command: 'getShortcutInTab',
    tabid: tab.id
  }, function(response) {
    urlIdMap = (/** @type {Object.<string, Array.<string>>} */ response);
    try {
      showAvailableUrls();
    } catch(ex) {
      errorDiv.innerHTML = ex;
    }
  });
});
