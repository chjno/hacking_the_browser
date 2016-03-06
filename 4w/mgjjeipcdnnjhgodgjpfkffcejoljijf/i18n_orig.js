/**
 * @fileoverview This script deals with the i18n translation and the language
 *     preferences.
 */

// namespace
var i18n = {};

i18n.TRANSLATIONS = {
  // browser_actions.js
  'Tab Actions': {
    'ja': 'タブ操作'
  },
  'Open my favorite page in a new tab': {
    'ja': '新しいタブで好きなページを開く'
  },
  'Open "$1" in a new tab': {
    'ja': '"$1" を新しいタブで開く'
  },
  'Open a new tab': {
    'ja': '新しいタブを作る'
  },
  'Open a new tab last': {
    'ja': '新しいタブを右端に作る'
  },
  'Open a blank tab': {
    'ja': '空白のタブを作る'
  },
  'Open a blank tab last': {
    'ja': '空白のタブを右端に作る'
  },
  'Open a background tab': {
    'ja': '未選択の新しいタブを作る'
  },
  'Open a background tab last': {
    'ja': '未選択の新しいタブを右端に作る'
  },
  'Close other tabs': {
    'ja': '他のタブを全て閉じる'
  },
  'Close left tabs': {
    'ja': '左のタブを全て閉じる'
  },
  'Close right tabs': {
    'ja': '右のタブを全て閉じる'
  },
  'Close the current tab': {
    'ja': 'タブを閉じる'
  },
  'Duplicate the current tab': {
    'ja': '現在のタブを複製する'
  },
  'Duplicate the current tab to a new window': {
    'ja': '現在のタブを新らしいウインドウで開く'
  },
  'Select the left tab': {
    'ja': '左のタブを選択する'
  },
  'Select the right tab': {
    'ja': '右のタブを選択する'
  },
  'Select the first tab': {
    'ja': '左端のタブを選択する'
  },
  'Select the 1st tab': {
    'ja': '左端のタブを選択する'
  },
  'Select the 2nd tab': {
    'ja': '2番目のタブを選択する'
  },
  'Select the 3rd tab': {
    'ja': '3番目のタブを選択する'
  },
  'Select the $1-th tab': {
    'ja': '$1 番目のタブを選択'
  },
  'Select the $1th tab': {
    'ja': '$1 番目のタブを選択'
  },
  'Select the last tab': {
    'ja': '右端のタブを選択する'
  },
  'Page Action': {
    'ja': 'ページ操作'
  },
  'Back': {
    'ja': '戻る'
  },
  'Forward': {
    'ja': '進む'
  },
  'Back to the first page': {
    'ja': '初めのページまで戻る'
  },
  'Reload': {
    'ja': '再読み込み'
  },
  'Reload (Cacheless)': {
    'ja': 'キャッシュを無視して再読み込み'
  },
  'Upper directory': {
    'ja': '上の階層へ飛ぶ'
  },
  'View source': {
    'ja': 'ソースを表示'
  },
  'Inner page action': {
    'ja': 'ページ内操作'
  },
  'Blur the focused element': {
    'ja': '選択を解除する'
  },
  'Focus on the $1-th text input': {
    'ja': '$1 番目の入力要素を選択する'
  },
  'Focus on the next input element': {
    'ja': '次の入力要素を選択する'
  },
  'Focus on the previous input element': {
    'ja': '前の入力要素を選択する'
  },
  'Page up': {
    'ja': '1ページ上へ'
  },
  'Page down': {
    'ja': '1ページ下へ'
  },
  'Scroll down': {
    'ja': '下へスクロール'
  },
  'Scroll up': {
    'ja': '上へスクロール'
  },
  'Scroll left': {
    'ja': '左へスクロール'
  },
  'Scroll right': {
    'ja': '右へスクロール'
  },
  'Scroll down by $1pixels': {
    'ja': '$1ピクセル下へスクロール'
  },
  'Scroll up by $1pixels': {
    'ja': '$1ピクセル上へスクロール'
  },
  'Scroll left by $1pixels': {
    'ja': '$1ピクセル左へスクロール'
  },
  'Scroll right by $1pixels': {
    'ja': '$1ピクセル右へスクロール'
  },
  'Scroll to the top': {
    'ja': 'ページの先頭に戻る'
  },
  'Scroll to the bottom': {
    'ja': 'ページの最後に飛ぶ'
  },
  'Cursor actions': {
    'ja': 'カーソル操作'
  },
  'Insert free text at the cursor position': {
    'ja': '任意のテキストをカーソルの位置に挿入'
  },
  'Go to head of a line': {
    'ja': '行頭へ移動'
  },
  'Go to end of a line': {
    'ja': '行末へ移動'
  },
  'Window actions': {
    'ja': 'ウインドウ操作'
  },
  'Open a new window': {
    'ja': '新しいウインドウを開く'
  },
  'Close the current window': {
    'ja': 'ウインドウを閉じる'
  },
  'Close all windows (Exit)': {
    'ja': '全てのウインドウを閉じる (終了する)'
  },
  'Screen Capture': {
    'ja': 'スクリーンキャプチャ'
  },
  'Capture the current tab': {
    'ja': '現在のタブをキャプチャする'
  },
  'Open Chrome pages': {
    'ja': 'ブラウザ関連のページを開く'
  },
  'Open Downloads': {
    'ja': 'ダウンロードのページを開く'
  },
  'Open Extension': {
    'ja': '機能拡張ページを開く'
  },
  'Open History': {
    'ja': '履歴ページを開く'
  },
  'Open ShortcutManager': {
    'ja': 'ShorcutManager を開く'
  },
  // key_util.js
  '"Clear History" dialog': {
    'ja': '"閲覧履歴の消去" を開く'
  },
  'Bookmark this page': {
    'ja': 'ブックマークする'
  },
  'Copy': {
    'ja': 'コピー'
  },
  'Cut': {
    'ja': 'カット'
  },
  'Default font size': {
    'ja': 'ズーム: 標準'
  },
  'Find': {
    'ja': '検索'
  },
  'Focus on the toolbar': {
    'ja': 'ツールバーにフォーカスする'
  },
  'Focus on the next element': {
    'ja': '次の要素を選択'
  },
  'Focus on the previous element': {
    'ja': '前の要素を選択'
  },
  'Full screen': {
    'ja': '全画面'
  },
  'Javascript console': {
    'ja': 'Javascript コンソール'
  },
  'Jump to the search box': {
    'ja': '検索ボックスに飛ぶ'
  },
  'Open': {
    'ja': '開く'
  },
  'Open the secret window': {
    'ja': 'シークレットモード'
  },
  'Open TaskManager': {
    'ja': 'タスクマネージャを開く'
  },
  'Open the Chrome support page': {
    'ja': 'Chrome サポートページを開く'
  },
  'Paste': {
    'ja': '貼り付け'
  },
  'Paste content as a plain text': {
    'ja': 'テキストとして貼り付け'
  },
  'Print': {
    'ja': '印刷する'
  },
  'Search previous': {
    'ja': '前を検索'
  },
  'Search next': {
    'ja': '次を検索'
  },
  'Select all': {
    'ja': '全て選択'
  },
  'Select the address bar': {
    'ja': 'アドレスバーを選択'
  },
  'Show the bookmark bar': {
    'ja': 'ブックマークバーを表示'
  },
  'Stop': {
    'ja': '読み込みを中止'
  },
  'Undo': {
    'ja': 'アンドゥ'
  },
  'Undo close tab': {
    'ja': '閉じたタブを復元'
  },
  'Zoom out': {
    'ja': 'ズーム: 縮小'
  },
  'Zoom up': {
    'ja': 'ズーム: 拡大'
  },
  // popup.html
  'Available shortcuts on': {
    'ja': 'このページ上のショートカット一覧'
  },
  'Click to disable/enable it': {
    'ja': 'クリックで on/off できます'
  },
  'See all settings / Add new shortcuts': {
    'ja': '全ての設定を見る / 新しいショートカットを追加する'
  },
  'No available shortcut keys on this page.': {
    'ja': 'このページで設定されているショートカットはありません。'
  },
  'If you add a new shortcut, it\'s not available until you reload the page.': {
    'ja': '新しいショートカットを追加した時はページを再読み込みする必要があります。'
  },
  'Click the link below to add new shortcut keys.': {
    'ja': '下のリンクからショートカットを追加することができます'
  },
  'Key conflict: $1 always triggers $2 before your action.': {
    'ja': 'キーの衝突: $1 は $2 を強制的に実行してしまいます'
  },
  'Key conflict: $1 triggers $2 before you finish typing.': {
    'ja': 'キーの衝突: 打ち終わる前に $1 が $2 を実行してしまいます'
  },
  '$1 hides the default browser action $2': {
    'ja': '$1 はブラウザのデフォルトの機能 $2 を上書きしています'
  },
  // options.html
  'Language': {
    'ja': '言語設定'
  },
  'Update History': {
    'ja': '更新履歴'
  },
  'Help': {
    'ja': 'ヘルプ'
  },
  'Your shortcuts': {
    'ja': 'ユーザー設定一覧'
  },
  'All shortcuts list': {
    'ja': 'ショートカットキー一覧'
  },
  'Add a new shortcut': {
    'ja': 'ショートカットを追加'
  },
  'Export your settings': {
    'ja': '設定をエクスポート'
  },
  'Import settings': {
    'ja': '設定をインポート'
  },
  'Specify URL of the setting file, or': {
    'ja': '設定ファイルの URL を入力するか、'
  },
  'copy and paste the settings directly.': {
    'ja': '直接設定コードを貼り付けてください。'
  },
  'Please select your settings you want to export.': {
    'ja': 'エクスポートしたいショートカットを選んでください。'
  },
  'Done': {
    'ja': '完了'
  },
  'You can use $1 or $2 to select multiple settings.': {
    'ja': '$1 や $2 で、複数項目選択できます。'
  },
  'Then click $1 again to finish.': {
    'ja': '最後にもう一度 $1 をクリックしてください。'
  },
  'Cancel': {
    'ja': 'キャンセル'
  },
  'not saved': {
    'ja': '未保存'
  },
  'Save': {
    'ja': '保存'
  },
  'Disable': {
    'ja': '無効にする'
  },
  'Enable': {
    'ja': '有効にする'
  },
  'Please specify name': {
    'ja': '名前が未記入です'
  },
  'Please specify url': {
    'ja': 'URL パターンが未記入です'
  },
  'Delete$1': {
    'ja': '削除$1'
  },
  'Key': {
    'ja': 'キー'
  },
  'Name': {
    'ja': 'ショートカット名'
  },
  'Description': {
    'ja': 'コメント'
  },
  'URL patterns': {
    'ja': 'URL パターン'
  },
  'This shortcut is available only in URLs that match the specified patterns.': {
    'ja': 'このショートカットキーは上の URL パターンにマッチするページのみで有効です'
  },
  '$1 is a wildcard character.': {
    'ja': '$1 はどの文字にもマッチします。'
  },
  'One URL pattern per line.': {
    'ja': '１行１パターンです。'
  },
  'Example (inclusion)': {
    'ja': 'マッチさせたい時の例'
  },
  'Example (removal)': {
    'ja': 'マッチさせたくないときの例'
  },
  'starts with $1': {
    'ja': '$1 で始めて下さい'
  },
  'Shortcut key': {
    'ja': 'ショートカットキー'
  },
  'Clear': {
    'ja': '空にする'
  },
  'Examples': {
    'ja': '例'
  },
  'Javascript code': {
    'ja': 'Javascript のコード'
  },
  'Bookmarklet code': {
    'ja': 'Bookmarklet のコード'
  },
  'If you leave it blank, the action below is always executed.': {
    'ja': '空にすると、常に下のコマンドを実行します'
  },
  'Type any shortcut key(s) here': {
    'ja': 'お好きなショートカットキーをタイプしてください。'
  },
  'Action': {
    'ja': 'コマンド'
  },
  'Browser action': {
    'ja': 'ブラウザ制御'
  },
  'Execute Javascript': {
    'ja': 'Javascript を実行する'
  },
  'Load and execute external Javascript file(s)': {
    'ja': '実行する外部 Javascript ファイル (URLs) を指定'
  },
  'optional': {
    'ja': '任意'
  },
  'Example': {
    'ja': '例'
  },
  'Then execute Javascript below': {
    'ja': 'その後、下の Javascript 実行する'
  },
  'Your setting change is not saved unless you click the $1 button.': {
    'ja': '$1 をクリックしないと設定は保存されません。'
  },
  'Are you sure to abandon this change?': {
    'ja': '現在の変更を破棄してもいいですか？'
  },
  'Click OK to abandon your change and move to other setting.': {
    'ja': '破棄する場合は OK をクリックしてください。'
  },
  'Click Cancel to stay here.' : {
    'ja': 'この設定にとどまる場合は Cancel をクリックしてください。'
  },
  'Are you sure to delete $1?': {
    'ja': '$1 を削除しますか？'
  },
  // options.js
  'Please write the description': {
    'ja': 'コメントが未記入です'
  },
  'Please specify URL pattern(s)': {
    'ja': 'URL パターンを記入してください'
  },
  'Cannot choose "Browser action" when the shortcut key is empty.': {
    'ja': 'ショートカットキーに何か入力しないとブラウザのコマンドは使えません'
  },
  'Please register a shortcut key for the browser action.': {
    'ja': 'ショートカットキーを登録しないとブラウザのコマンドは使えません'
  },
  'If you leave it blank, the Javascript code is always executed when you open a page.': {
    'ja': 'ショートカットを空にすると、Javascript のコードはページを開いたときに常に実行されます。'
  },
  'Note': {
    'ja': '注意'
  },
  // export.html
  'Export completed!': {
    'ja': 'エクスポートが完了しました。'
  },
  '2 ways to let other people install your settings': {
    'ja': '以下の２つの方法で設定を渡すことができます'
  },
  'Copy the Javascript code below and': {
    'ja': '下の Javascript をコピーして'
  },
  'send it to other people.': {
    'ja': '他の人に直接送る。'
  },
  'make the Javascript file of the same content on the Web.': {
    'ja': 'そのファイルを作り、Web 上に置く。'
  },
  'Let other people import it from the URL.': {
    'ja': '他の人にその URL を指定させる。'
  },
  'Click to select all': {
    'ja': 'クリックで全選択'
  },
  'Always executed:' : {
    'ja': '常に実行:'
  },
  'User defined keys:' : {
    'ja': 'ユーザー設定のキー:'
  },
  'Browser default keys:' : {
    'ja': 'ブラウザのデフォルトのキー:'
  },
  'Edit': {
    'ja': '編集'
  },
  'This disables the default browser action': {
    'ja': 'これはブラウザのデフォルトの挙動を無効化します'
  },
  'If you write nothing, $1 is disabled': {
    'ja': '何も書かないと、$1 は無効化されます'
  },
  // data_format.js
  'Failure in save': {
    'ja': '保存に失敗しました'
  },
  'Could not load: $1': {
    'ja': '$1 を読み込めませんでした'
  },
  'Greasemonkey specifies the following URL patterns': {
    'ja': 'Greasemonkey は以下の URL パターンを指定しています'
  },
  'Your URL patterns are as follows': {
    'ja': 'あなたの指定した URL パターンは以下になります'
  },
  'Do you overwrite the URL patterns?': {
    'ja': 'URL パターンを上書きしますか？'
  },
  '$1 or $2 is not supported': {
    'ja': '$1 や $2 はサポートされていません'
  },
  '$1 appeared more than once': {
    'ja': '$1 が二回以上現れました'
  },
  'Installing the following $1 new patterns': {
    'ja': '新しい $1 パターンをインストールします'
  },
  'Overwriting the following $1 patterns': {
    'ja': '既存の $1 パターンを更新します'
  },
  'No valid import data.': {
    'ja': '正しいインポートデータがありませんでした'
  },
  'New shortcut': {
    'ja': '新規ショートカット'
  },
  // capture.html
  'Captured the JPEG image ($1)': {
    'ja': 'JPEG 画像 ($1) をキャプチャしました'
  },
  'shown in the 75% scale': {
    'ja': '75% 縮尺で表示'
  },
  'Right-Click $1 , and' : {
    'ja': '$1 を右クリックすれば'
  },
  'Save this image as...': {
    'ja': '名前を付けて画像を保存...'
  },
  'you can download this image.': {
    'ja': 'この画像をダウンロードできます。'
  },
  'You cannot overwrite this key': {
    'ja': 'このキーは編集・変更できません。'
  },
  'Edit this shortcut key': {
    'ja': 'このキーを編集'
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
