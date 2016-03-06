// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview This script deals with the i18n translation and the language
 *     preferences.
 * @author jumpei@google.com (Jumpei Takeuchi)
 */

// namespace
var i18n = {};

i18n.TRANSLATIONS = {
  // browser_actions.js
  'Tab Actions': {
    'ja': '\u30bf\u30d6\u64cd\u4f5c'
  },
  'Open my favorite page in a new tab': {
    'ja': '\u65b0\u3057\u3044\u30bf\u30d6\u3067\u597d\u304d\u306a\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Open "$1" in a new tab': {
    'ja': '"$1" \u3092\u65b0\u3057\u3044\u30bf\u30d6\u3067\u958b\u304f'
  },
  'Open a new tab': {
    'ja': '\u65b0\u3057\u3044\u30bf\u30d6\u3092\u4f5c\u308b'
  },
  'Open a new tab last': {
    'ja': '\u65b0\u3057\u3044\u30bf\u30d6\u3092\u53f3\u7aef\u306b\u4f5c\u308b'
  },
  'Open a blank tab': {
    'ja': '\u7a7a\u767d\u306e\u30bf\u30d6\u3092\u4f5c\u308b'
  },
  'Open a blank tab last': {
    'ja': '\u7a7a\u767d\u306e\u30bf\u30d6\u3092\u53f3\u7aef\u306b\u4f5c\u308b'
  },
  'Open a background tab': {
    'ja': '\u672a\u9078\u629e\u306e\u65b0\u3057\u3044\u30bf\u30d6\u3092\u4f5c\u308b'
  },
  'Open a background tab last': {
    'ja': '\u672a\u9078\u629e\u306e\u65b0\u3057\u3044\u30bf\u30d6\u3092\u53f3\u7aef\u306b\u4f5c\u308b'
  },
  'Close other tabs': {
    'ja': '\u4ed6\u306e\u30bf\u30d6\u3092\u5168\u3066\u9589\u3058\u308b'
  },
  'Close left tabs': {
    'ja': '\u5de6\u306e\u30bf\u30d6\u3092\u5168\u3066\u9589\u3058\u308b'
  },
  'Close right tabs': {
    'ja': '\u53f3\u306e\u30bf\u30d6\u3092\u5168\u3066\u9589\u3058\u308b'
  },
  'Close the current tab': {
    'ja': '\u30bf\u30d6\u3092\u9589\u3058\u308b'
  },
  'Duplicate the current tab': {
    'ja': '\u73fe\u5728\u306e\u30bf\u30d6\u3092\u8907\u88fd\u3059\u308b'
  },
  'Duplicate the current tab to a new window': {
    'ja': '\u73fe\u5728\u306e\u30bf\u30d6\u3092\u65b0\u3089\u3057\u3044\u30a6\u30a4\u30f3\u30c9\u30a6\u3067\u958b\u304f'
  },
  'Select the left tab': {
    'ja': '\u5de6\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the right tab': {
    'ja': '\u53f3\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the first tab': {
    'ja': '\u5de6\u7aef\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the 1st tab': {
    'ja': '\u5de6\u7aef\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the 2nd tab': {
    'ja': '2\u756a\u76ee\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the 3rd tab': {
    'ja': '3\u756a\u76ee\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Select the $1-th tab': {
    'ja': '$1 \u756a\u76ee\u306e\u30bf\u30d6\u3092\u9078\u629e'
  },
  'Select the $1th tab': {
    'ja': '$1 \u756a\u76ee\u306e\u30bf\u30d6\u3092\u9078\u629e'
  },
  'Select the last tab': {
    'ja': '\u53f3\u7aef\u306e\u30bf\u30d6\u3092\u9078\u629e\u3059\u308b'
  },
  'Page Action': {
    'ja': '\u30da\u30fc\u30b8\u64cd\u4f5c'
  },
  'Back': {
    'ja': '\u623b\u308b'
  },
  'Forward': {
    'ja': '\u9032\u3080'
  },
  'Back to the first page': {
    'ja': '\u521d\u3081\u306e\u30da\u30fc\u30b8\u307e\u3067\u623b\u308b'
  },
  'Reload': {
    'ja': '\u518d\u8aad\u307f\u8fbc\u307f'
  },
  'Reload (Cacheless)': {
    'ja': '\u30ad\u30e3\u30c3\u30b7\u30e5\u3092\u7121\u8996\u3057\u3066\u518d\u8aad\u307f\u8fbc\u307f'
  },
  'Upper directory': {
    'ja': '\u4e0a\u306e\u968e\u5c64\u3078\u98db\u3076'
  },
  'View source': {
    'ja': '\u30bd\u30fc\u30b9\u3092\u8868\u793a'
  },
  'Inner page action': {
    'ja': '\u30da\u30fc\u30b8\u5185\u64cd\u4f5c'
  },
  'Blur the focused element': {
    'ja': '\u9078\u629e\u3092\u89e3\u9664\u3059\u308b'
  },
  'Focus on the $1-th text input': {
    'ja': '$1 \u756a\u76ee\u306e\u5165\u529b\u8981\u7d20\u3092\u9078\u629e\u3059\u308b'
  },
  'Focus on the next input element': {
    'ja': '\u6b21\u306e\u5165\u529b\u8981\u7d20\u3092\u9078\u629e\u3059\u308b'
  },
  'Focus on the previous input element': {
    'ja': '\u524d\u306e\u5165\u529b\u8981\u7d20\u3092\u9078\u629e\u3059\u308b'
  },
  'Page up': {
    'ja': '1\u30da\u30fc\u30b8\u4e0a\u3078'
  },
  'Page down': {
    'ja': '1\u30da\u30fc\u30b8\u4e0b\u3078'
  },
  'Scroll down': {
    'ja': '\u4e0b\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll up': {
    'ja': '\u4e0a\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll left': {
    'ja': '\u5de6\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll right': {
    'ja': '\u53f3\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll down by $1pixels': {
    'ja': '$1\u30d4\u30af\u30bb\u30eb\u4e0b\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll up by $1pixels': {
    'ja': '$1\u30d4\u30af\u30bb\u30eb\u4e0a\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll left by $1pixels': {
    'ja': '$1\u30d4\u30af\u30bb\u30eb\u5de6\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll right by $1pixels': {
    'ja': '$1\u30d4\u30af\u30bb\u30eb\u53f3\u3078\u30b9\u30af\u30ed\u30fc\u30eb'
  },
  'Scroll to the top': {
    'ja': '\u30da\u30fc\u30b8\u306e\u5148\u982d\u306b\u623b\u308b'
  },
  'Scroll to the bottom': {
    'ja': '\u30da\u30fc\u30b8\u306e\u6700\u5f8c\u306b\u98db\u3076'
  },
  'Cursor actions': {
    'ja': '\u30ab\u30fc\u30bd\u30eb\u64cd\u4f5c'
  },
  'Insert free text at the cursor position': {
    'ja': '\u4efb\u610f\u306e\u30c6\u30ad\u30b9\u30c8\u3092\u30ab\u30fc\u30bd\u30eb\u306e\u4f4d\u7f6e\u306b\u633f\u5165'
  },
  'Go to head of a line': {
    'ja': '\u884c\u982d\u3078\u79fb\u52d5'
  },
  'Go to end of a line': {
    'ja': '\u884c\u672b\u3078\u79fb\u52d5'
  },
  'Window actions': {
    'ja': '\u30a6\u30a4\u30f3\u30c9\u30a6\u64cd\u4f5c'
  },
  'Open a new window': {
    'ja': '\u65b0\u3057\u3044\u30a6\u30a4\u30f3\u30c9\u30a6\u3092\u958b\u304f'
  },
  'Close the current window': {
    'ja': '\u30a6\u30a4\u30f3\u30c9\u30a6\u3092\u9589\u3058\u308b'
  },
  'Close all windows (Exit)': {
    'ja': '\u5168\u3066\u306e\u30a6\u30a4\u30f3\u30c9\u30a6\u3092\u9589\u3058\u308b (\u7d42\u4e86\u3059\u308b)'
  },
  'Screen Capture': {
    'ja': '\u30b9\u30af\u30ea\u30fc\u30f3\u30ad\u30e3\u30d7\u30c1\u30e3'
  },
  'Capture the current tab': {
    'ja': '\u73fe\u5728\u306e\u30bf\u30d6\u3092\u30ad\u30e3\u30d7\u30c1\u30e3\u3059\u308b'
  },
  'Open Chrome pages': {
    'ja': '\u30d6\u30e9\u30a6\u30b6\u95a2\u9023\u306e\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Open Downloads': {
    'ja': '\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306e\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Open Extension': {
    'ja': '\u6a5f\u80fd\u62e1\u5f35\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Open History': {
    'ja': '\u5c65\u6b74\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Open ShortcutManager': {
    'ja': 'ShorcutManager \u3092\u958b\u304f'
  },
  // key_util.js
  '"Clear History" dialog': {
    'ja': '"\u95b2\u89a7\u5c65\u6b74\u306e\u6d88\u53bb" \u3092\u958b\u304f'
  },
  'Bookmark this page': {
    'ja': '\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3059\u308b'
  },
  'Copy': {
    'ja': '\u30b3\u30d4\u30fc'
  },
  'Cut': {
    'ja': '\u30ab\u30c3\u30c8'
  },
  'Default font size': {
    'ja': '\u30ba\u30fc\u30e0: \u6a19\u6e96'
  },
  'Find': {
    'ja': '\u691c\u7d22'
  },
  'Focus on the toolbar': {
    'ja': '\u30c4\u30fc\u30eb\u30d0\u30fc\u306b\u30d5\u30a9\u30fc\u30ab\u30b9\u3059\u308b'
  },
  'Focus on the next element': {
    'ja': '\u6b21\u306e\u8981\u7d20\u3092\u9078\u629e'
  },
  'Focus on the previous element': {
    'ja': '\u524d\u306e\u8981\u7d20\u3092\u9078\u629e'
  },
  'Full screen': {
    'ja': '\u5168\u753b\u9762'
  },
  'Javascript console': {
    'ja': 'Javascript \u30b3\u30f3\u30bd\u30fc\u30eb'
  },
  'Jump to the search box': {
    'ja': '\u691c\u7d22\u30dc\u30c3\u30af\u30b9\u306b\u98db\u3076'
  },
  'Open': {
    'ja': '\u958b\u304f'
  },
  'Open the secret window': {
    'ja': '\u30b7\u30fc\u30af\u30ec\u30c3\u30c8\u30e2\u30fc\u30c9'
  },
  'Open TaskManager': {
    'ja': '\u30bf\u30b9\u30af\u30de\u30cd\u30fc\u30b8\u30e3\u3092\u958b\u304f'
  },
  'Open the Chrome support page': {
    'ja': 'Chrome \u30b5\u30dd\u30fc\u30c8\u30da\u30fc\u30b8\u3092\u958b\u304f'
  },
  'Paste': {
    'ja': '\u8cbc\u308a\u4ed8\u3051'
  },
  'Paste content as a plain text': {
    'ja': '\u30c6\u30ad\u30b9\u30c8\u3068\u3057\u3066\u8cbc\u308a\u4ed8\u3051'
  },
  'Print': {
    'ja': '\u5370\u5237\u3059\u308b'
  },
  'Search previous': {
    'ja': '\u524d\u3092\u691c\u7d22'
  },
  'Search next': {
    'ja': '\u6b21\u3092\u691c\u7d22'
  },
  'Select all': {
    'ja': '\u5168\u3066\u9078\u629e'
  },
  'Select the address bar': {
    'ja': '\u30a2\u30c9\u30ec\u30b9\u30d0\u30fc\u3092\u9078\u629e'
  },
  'Show the bookmark bar': {
    'ja': '\u30d6\u30c3\u30af\u30de\u30fc\u30af\u30d0\u30fc\u3092\u8868\u793a'
  },
  'Stop': {
    'ja': '\u8aad\u307f\u8fbc\u307f\u3092\u4e2d\u6b62'
  },
  'Undo': {
    'ja': '\u30a2\u30f3\u30c9\u30a5'
  },
  'Undo close tab': {
    'ja': '\u9589\u3058\u305f\u30bf\u30d6\u3092\u5fa9\u5143'
  },
  'Zoom out': {
    'ja': '\u30ba\u30fc\u30e0: \u7e2e\u5c0f'
  },
  'Zoom up': {
    'ja': '\u30ba\u30fc\u30e0: \u62e1\u5927'
  },
  // popup.html
  'Available shortcuts on': {
    'ja': '\u3053\u306e\u30da\u30fc\u30b8\u4e0a\u306e\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u4e00\u89a7'
  },
  'Click to disable/enable it': {
    'ja': '\u30af\u30ea\u30c3\u30af\u3067 on/off \u3067\u304d\u307e\u3059'
  },
  'See all settings / Add new shortcuts': {
    'ja': '\u5168\u3066\u306e\u8a2d\u5b9a\u3092\u898b\u308b / \u65b0\u3057\u3044\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u8ffd\u52a0\u3059\u308b'
  },
  'No available shortcut keys on this page.': {
    'ja': '\u3053\u306e\u30da\u30fc\u30b8\u3067\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u308b\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u306f\u3042\u308a\u307e\u305b\u3093\u3002'
  },
  'If you add a new shortcut, it\'s not available until you reload the page.': {
    'ja': '\u65b0\u3057\u3044\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u8ffd\u52a0\u3057\u305f\u6642\u306f\u30da\u30fc\u30b8\u3092\u518d\u8aad\u307f\u8fbc\u307f\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002'
  },
  'Click the link below to add new shortcut keys.': {
    'ja': '\u4e0b\u306e\u30ea\u30f3\u30af\u304b\u3089\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u8ffd\u52a0\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059'
  },
  'Key conflict: $1 always triggers $2 before your action.': {
    'ja': '\u30ad\u30fc\u306e\u885d\u7a81: $1 \u306f $2 \u3092\u5f37\u5236\u7684\u306b\u5b9f\u884c\u3057\u3066\u3057\u307e\u3044\u307e\u3059'
  },
  'Key conflict: $1 triggers $2 before you finish typing.': {
    'ja': '\u30ad\u30fc\u306e\u885d\u7a81: \u6253\u3061\u7d42\u308f\u308b\u524d\u306b $1 \u304c $2 \u3092\u5b9f\u884c\u3057\u3066\u3057\u307e\u3044\u307e\u3059'
  },
  '$1 hides the default browser action $2': {
    'ja': '$1 \u306f\u30d6\u30e9\u30a6\u30b6\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u306e\u6a5f\u80fd $2 \u3092\u4e0a\u66f8\u304d\u3057\u3066\u3044\u307e\u3059'
  },
  // options.html
  'Language': {
    'ja': '\u8a00\u8a9e\u8a2d\u5b9a'
  },
  'Update History': {
    'ja': '\u66f4\u65b0\u5c65\u6b74'
  },
  'Help': {
    'ja': '\u30d8\u30eb\u30d7'
  },
  'Your shortcuts': {
    'ja': '\u30e6\u30fc\u30b6\u30fc\u8a2d\u5b9a\u4e00\u89a7'
  },
  'All shortcuts list': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc\u4e00\u89a7'
  },
  'Add a new shortcut': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u8ffd\u52a0'
  },
  'Export your settings': {
    'ja': '\u8a2d\u5b9a\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8'
  },
  'Import settings': {
    'ja': '\u8a2d\u5b9a\u3092\u30a4\u30f3\u30dd\u30fc\u30c8'
  },
  'Specify URL of the setting file, or': {
    'ja': '\u8a2d\u5b9a\u30d5\u30a1\u30a4\u30eb\u306e URL \u3092\u5165\u529b\u3059\u308b\u304b\u3001'
  },
  'copy and paste the settings directly.': {
    'ja': '\u76f4\u63a5\u8a2d\u5b9a\u30b3\u30fc\u30c9\u3092\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044\u3002'
  },
  'Please select your settings you want to export.': {
    'ja': '\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u3057\u305f\u3044\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002'
  },
  'Done': {
    'ja': '\u5b8c\u4e86'
  },
  'You can use $1 or $2 to select multiple settings.': {
    'ja': '$1 \u3084 $2 \u3067\u3001\u8907\u6570\u9805\u76ee\u9078\u629e\u3067\u304d\u307e\u3059\u3002'
  },
  'Then click $1 again to finish.': {
    'ja': '\u6700\u5f8c\u306b\u3082\u3046\u4e00\u5ea6 $1 \u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002'
  },
  'Cancel': {
    'ja': '\u30ad\u30e3\u30f3\u30bb\u30eb'
  },
  'not saved': {
    'ja': '\u672a\u4fdd\u5b58'
  },
  'Save': {
    'ja': '\u4fdd\u5b58'
  },
  'Disable': {
    'ja': '\u7121\u52b9\u306b\u3059\u308b'
  },
  'Enable': {
    'ja': '\u6709\u52b9\u306b\u3059\u308b'
  },
  'Please specify name': {
    'ja': '\u540d\u524d\u304c\u672a\u8a18\u5165\u3067\u3059'
  },
  'Please specify url': {
    'ja': 'URL \u30d1\u30bf\u30fc\u30f3\u304c\u672a\u8a18\u5165\u3067\u3059'
  },
  'Delete$1': {
    'ja': '\u524a\u9664$1'
  },
  'Key': {
    'ja': '\u30ad\u30fc'
  },
  'Name': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u540d'
  },
  'Description': {
    'ja': '\u30b3\u30e1\u30f3\u30c8'
  },
  'URL patterns': {
    'ja': 'URL \u30d1\u30bf\u30fc\u30f3'
  },
  'This shortcut is available only in URLs that match the specified patterns.': {
    'ja': '\u3053\u306e\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc\u306f\u4e0a\u306e URL \u30d1\u30bf\u30fc\u30f3\u306b\u30de\u30c3\u30c1\u3059\u308b\u30da\u30fc\u30b8\u306e\u307f\u3067\u6709\u52b9\u3067\u3059'
  },
  '$1 is a wildcard character.': {
    'ja': '$1 \u306f\u3069\u306e\u6587\u5b57\u306b\u3082\u30de\u30c3\u30c1\u3057\u307e\u3059\u3002'
  },
  'One URL pattern per line.': {
    'ja': '\uff11\u884c\uff11\u30d1\u30bf\u30fc\u30f3\u3067\u3059\u3002'
  },
  'Example (inclusion)': {
    'ja': '\u30de\u30c3\u30c1\u3055\u305b\u305f\u3044\u6642\u306e\u4f8b'
  },
  'Example (removal)': {
    'ja': '\u30de\u30c3\u30c1\u3055\u305b\u305f\u304f\u306a\u3044\u3068\u304d\u306e\u4f8b'
  },
  'starts with $1': {
    'ja': '$1 \u3067\u59cb\u3081\u3066\u4e0b\u3055\u3044'
  },
  'Shortcut key': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc'
  },
  'Clear': {
    'ja': '\u7a7a\u306b\u3059\u308b'
  },
  'Examples': {
    'ja': '\u4f8b'
  },
  'Javascript code': {
    'ja': 'Javascript \u306e\u30b3\u30fc\u30c9'
  },
  'Bookmarklet code': {
    'ja': 'Bookmarklet \u306e\u30b3\u30fc\u30c9'
  },
  'If you leave it blank, the action below is always executed.': {
    'ja': '\u7a7a\u306b\u3059\u308b\u3068\u3001\u5e38\u306b\u4e0b\u306e\u30b3\u30de\u30f3\u30c9\u3092\u5b9f\u884c\u3057\u307e\u3059'
  },
  'Type any shortcut key(s) here': {
    'ja': '\u304a\u597d\u304d\u306a\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc\u3092\u30bf\u30a4\u30d7\u3057\u3066\u304f\u3060\u3055\u3044\u3002'
  },
  'Action': {
    'ja': '\u30b3\u30de\u30f3\u30c9'
  },
  'Browser action': {
    'ja': '\u30d6\u30e9\u30a6\u30b6\u5236\u5fa1'
  },
  'Execute Javascript': {
    'ja': 'Javascript \u3092\u5b9f\u884c\u3059\u308b'
  },
  'Load and execute external Javascript file(s)': {
    'ja': '\u5b9f\u884c\u3059\u308b\u5916\u90e8 Javascript \u30d5\u30a1\u30a4\u30eb (URLs) \u3092\u6307\u5b9a'
  },
  'optional': {
    'ja': '\u4efb\u610f'
  },
  'Example': {
    'ja': '\u4f8b'
  },
  'Then execute Javascript below': {
    'ja': '\u305d\u306e\u5f8c\u3001\u4e0b\u306e Javascript \u5b9f\u884c\u3059\u308b'
  },
  'Your setting change is not saved unless you click the $1 button.': {
    'ja': '$1 \u3092\u30af\u30ea\u30c3\u30af\u3057\u306a\u3044\u3068\u8a2d\u5b9a\u306f\u4fdd\u5b58\u3055\u308c\u307e\u305b\u3093\u3002'
  },
  'Are you sure to abandon this change?': {
    'ja': '\u73fe\u5728\u306e\u5909\u66f4\u3092\u7834\u68c4\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f'
  },
  'Click OK to abandon your change and move to other setting.': {
    'ja': '\u7834\u68c4\u3059\u308b\u5834\u5408\u306f OK \u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002'
  },
  'Click Cancel to stay here.' : {
    'ja': '\u3053\u306e\u8a2d\u5b9a\u306b\u3068\u3069\u307e\u308b\u5834\u5408\u306f Cancel \u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002'
  },
  'Are you sure to delete $1?': {
    'ja': '$1 \u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f'
  },
  // options.js
  'Please write the description': {
    'ja': '\u30b3\u30e1\u30f3\u30c8\u304c\u672a\u8a18\u5165\u3067\u3059'
  },
  'Please specify URL pattern(s)': {
    'ja': 'URL \u30d1\u30bf\u30fc\u30f3\u3092\u8a18\u5165\u3057\u3066\u304f\u3060\u3055\u3044'
  },
  'Cannot choose "Browser action" when the shortcut key is empty.': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc\u306b\u4f55\u304b\u5165\u529b\u3057\u306a\u3044\u3068\u30d6\u30e9\u30a6\u30b6\u306e\u30b3\u30de\u30f3\u30c9\u306f\u4f7f\u3048\u307e\u305b\u3093'
  },
  'Please register a shortcut key for the browser action.': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u30ad\u30fc\u3092\u767b\u9332\u3057\u306a\u3044\u3068\u30d6\u30e9\u30a6\u30b6\u306e\u30b3\u30de\u30f3\u30c9\u306f\u4f7f\u3048\u307e\u305b\u3093'
  },
  'If you leave it blank, the Javascript code is always executed when you open a page.': {
    'ja': '\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8\u3092\u7a7a\u306b\u3059\u308b\u3068\u3001Javascript \u306e\u30b3\u30fc\u30c9\u306f\u30da\u30fc\u30b8\u3092\u958b\u3044\u305f\u3068\u304d\u306b\u5e38\u306b\u5b9f\u884c\u3055\u308c\u307e\u3059\u3002'
  },
  'Note': {
    'ja': '\u6ce8\u610f'
  },
  // export.html
  'Export completed!': {
    'ja': '\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002'
  },
  '2 ways to let other people install your settings': {
    'ja': '\u4ee5\u4e0b\u306e\uff12\u3064\u306e\u65b9\u6cd5\u3067\u8a2d\u5b9a\u3092\u6e21\u3059\u3053\u3068\u304c\u3067\u304d\u307e\u3059'
  },
  'Copy the Javascript code below and': {
    'ja': '\u4e0b\u306e Javascript \u3092\u30b3\u30d4\u30fc\u3057\u3066'
  },
  'send it to other people.': {
    'ja': '\u4ed6\u306e\u4eba\u306b\u76f4\u63a5\u9001\u308b\u3002'
  },
  'make the Javascript file of the same content on the Web.': {
    'ja': '\u305d\u306e\u30d5\u30a1\u30a4\u30eb\u3092\u4f5c\u308a\u3001Web \u4e0a\u306b\u7f6e\u304f\u3002'
  },
  'Let other people import it from the URL.': {
    'ja': '\u4ed6\u306e\u4eba\u306b\u305d\u306e URL \u3092\u6307\u5b9a\u3055\u305b\u308b\u3002'
  },
  'Click to select all': {
    'ja': '\u30af\u30ea\u30c3\u30af\u3067\u5168\u9078\u629e'
  },
  'Always executed:' : {
    'ja': '\u5e38\u306b\u5b9f\u884c:'
  },
  'User defined keys:' : {
    'ja': '\u30e6\u30fc\u30b6\u30fc\u8a2d\u5b9a\u306e\u30ad\u30fc:'
  },
  'Browser default keys:' : {
    'ja': '\u30d6\u30e9\u30a6\u30b6\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u306e\u30ad\u30fc:'
  },
  'Edit': {
    'ja': '\u7de8\u96c6'
  },
  'This disables the default browser action': {
    'ja': '\u3053\u308c\u306f\u30d6\u30e9\u30a6\u30b6\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u306e\u6319\u52d5\u3092\u7121\u52b9\u5316\u3057\u307e\u3059'
  },
  'If you write nothing, $1 is disabled': {
    'ja': '\u4f55\u3082\u66f8\u304b\u306a\u3044\u3068\u3001$1 \u306f\u7121\u52b9\u5316\u3055\u308c\u307e\u3059'
  },
  // data_format.js
  'Failure in save': {
    'ja': '\u4fdd\u5b58\u306b\u5931\u6557\u3057\u307e\u3057\u305f'
  },
  'Could not load: $1': {
    'ja': '$1 \u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\u3067\u3057\u305f'
  },
  'Greasemonkey specifies the following URL patterns': {
    'ja': 'Greasemonkey \u306f\u4ee5\u4e0b\u306e URL \u30d1\u30bf\u30fc\u30f3\u3092\u6307\u5b9a\u3057\u3066\u3044\u307e\u3059'
  },
  'Your URL patterns are as follows': {
    'ja': '\u3042\u306a\u305f\u306e\u6307\u5b9a\u3057\u305f URL \u30d1\u30bf\u30fc\u30f3\u306f\u4ee5\u4e0b\u306b\u306a\u308a\u307e\u3059'
  },
  'Do you overwrite the URL patterns?': {
    'ja': 'URL \u30d1\u30bf\u30fc\u30f3\u3092\u4e0a\u66f8\u304d\u3057\u307e\u3059\u304b\uff1f'
  },
  '$1 or $2 is not supported': {
    'ja': '$1 \u3084 $2 \u306f\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u305b\u3093'
  },
  '$1 appeared more than once': {
    'ja': '$1 \u304c\u4e8c\u56de\u4ee5\u4e0a\u73fe\u308c\u307e\u3057\u305f'
  },
  'Installing the following $1 new patterns': {
    'ja': '\u65b0\u3057\u3044 $1 \u30d1\u30bf\u30fc\u30f3\u3092\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3057\u307e\u3059'
  },
  'Overwriting the following $1 patterns': {
    'ja': '\u65e2\u5b58\u306e $1 \u30d1\u30bf\u30fc\u30f3\u3092\u66f4\u65b0\u3057\u307e\u3059'
  },
  'No valid import data.': {
    'ja': '\u6b63\u3057\u3044\u30a4\u30f3\u30dd\u30fc\u30c8\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f'
  },
  'New shortcut': {
    'ja': '\u65b0\u898f\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8'
  },
  // capture.html
  'Captured the JPEG image ($1)': {
    'ja': 'JPEG \u753b\u50cf ($1) \u3092\u30ad\u30e3\u30d7\u30c1\u30e3\u3057\u307e\u3057\u305f'
  },
  'shown in the 75% scale': {
    'ja': '75% \u7e2e\u5c3a\u3067\u8868\u793a'
  },
  'Right-Click $1 , and' : {
    'ja': '$1 \u3092\u53f3\u30af\u30ea\u30c3\u30af\u3059\u308c\u3070'
  },
  'Save this image as...': {
    'ja': '\u540d\u524d\u3092\u4ed8\u3051\u3066\u753b\u50cf\u3092\u4fdd\u5b58...'
  },
  'you can download this image.': {
    'ja': '\u3053\u306e\u753b\u50cf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3067\u304d\u307e\u3059\u3002'
  },
  'You cannot overwrite this key': {
    'ja': '\u3053\u306e\u30ad\u30fc\u306f\u7de8\u96c6\u30fb\u5909\u66f4\u3067\u304d\u307e\u305b\u3093\u3002'
  },
  'Edit this shortcut key': {
    'ja': '\u3053\u306e\u30ad\u30fc\u3092\u7de8\u96c6'
  }
};

/**
 * @param {string} lang The language string such as "ja", "en-US".
 * @constructor
 */
i18n.Translator = function(lang) {
  this.regTransMap_ = [];
  for (var english in i18n.TRANSLATIONS) {
    if (i18n.TRANSLATIONS[english][lang]) {
      var englishReg = new RegExp(
        '^ ?' + english.replace(/([-?+*^\\.{}\(\)\[\]])/g, '\\$1')
                     .replace(/\$\d+/g, '(.*?)') + ' ?$');
      this.regTransMap_.push({
        reg: englishReg,
        text:i18n.TRANSLATIONS[english][lang]
      });
    }
  }
};

/**
 * @param {string} text Source text in English.
 */
i18n.Translator.prototype.translate = function(text) {
  text = text.replace(/\s+/g, ' ');
  for (var j = 0; j < this.regTransMap_.length; ++j) {
    var match = text.match(this.regTransMap_[j].reg);
    if (match) {
      var newText = this.regTransMap_[j].text;
      for (var k = match.length - 1; k > 0; k--) {
        newText = newText.replace(new RegExp('\\$' + k, 'g'), match[k]);
      }
      return newText;
    }
  }
  return text;
};

/**
 * @param {HTMLSelectElement} sel
 */
i18n.addLanguagePreferenceToSelect = function(sel) {
  var lang = localStorage.getItem('lang');
  chrome.i18n.getAcceptLanguages(function(langs) {
    for (var i = 0; i < langs.length; ++i) {
      var option = document.createElement('option');
      option.value = option.text = langs[i];
      sel.appendChild(option);
      if (lang == langs[i]) {
        sel.selectedIndex = sel.options.length - 1;
      }
    }
    sel.addEventListener('change', function() {
      localStorage.setItem('lang', this.value);
      window.location.reload();
    }, false);
  });
};

/**
 * @type {i18n.Translator}
 */
i18n.translator = new i18n.Translator(localStorage.getItem('lang') || 'en');
i18n.translate = util.bind(i18n.translator.translate, i18n.translator);

(function () {
  var snaps = document.evaluate('//*[@i18n]', document.body, null, 7, null);
  var level = function(elem) {
  if (elem == document.body) {
    return 0;
    } else {
      return 1 + level(elem.parentNode);
    }
  };
  // need to translate elements in a deep location first.
  var elemArray = [];
  for (var i = 0; i < snaps.snapshotLength; ++i) {
    var elem = snaps.snapshotItem(i);
    elemArray.push({ elem: elem, depth: level(elem) });
  }
  elemArray.sort(function(a, b) {
    return (a.depth < b.depth ? 1 : -1);
  });
  for (i = 0; i < elemArray.length; ++i) {
    var elem = elemArray[i].elem;
    if (elem) {
      elem.textContent = i18n.translate(elem.textContent);
    }
  }
})();
