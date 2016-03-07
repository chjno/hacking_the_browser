console.log('begin living and learning');

var metaPressed = false;
var altPressed = false;
var shiftPressed = false;
var ctrlPressed = false;

var tabCreated = false;
var tabClosing = false;
var allTabIds = [];
var currentTabIndex;
var currentTabId;
var currentWindowIndex;
var currentWindowId;
var tabJump;
var windowsObj = {};
var windowsMinimized = 0;
var currentMinimizedCount = null;
var lastClosedUrl = [];
var filteredClosedUrls = [];

function getWindows(poop) {
  chrome.windows.getAll({ populate: true }, function(windows) {

    var sameWindow;
    var windowMinimized;
    minimizedCount = 0;

    allWindows = windows;
    for (i = 0; i < allWindows.length; i++) {

      windowsObj[allWindows[i].id] = [];

      if (allWindows[i].focused) {
        if (currentWindowIndex == i) {
          sameWindow = true;
        } else {
          sameWindow = false;
        }
        currentWindowIndex = i;
        currentWindowId = allWindows[i].id;
      } else {
        if (allWindows[i].state == 'minimized') {
          minimizedCount++;
        }
      }


      for (j = 0; j < allWindows[i].tabs.length; j++) {
        allTabIds.push(allWindows[i].tabs[j].id);

        windowsObj[allWindows[i].id].push(allWindows[i].tabs[j].id);

        if (currentWindowIndex == i && allWindows[i].tabs[j].selected) {
          if (tabJump == undefined) {
            tabJump = 0;
          } else {
            tabJump = j - currentTabIndex;
          }
          currentTabIndex = j;
          currentTabId = allWindows[i].tabs[j].id;
        }
      }
    }

    if (currentMinimizedCount != null) {
      if (minimizedCount > currentMinimizedCount) {
        // minimized
        switchWindow(true);
      } else if (minimizedCount == currentMinimizedCount && !sameWindow) {
        switchWindow(false);
      }
      currentMinimizedCount = countMinimized(minimizedCount);
    } else {
      currentMinimizedCount = countMinimized(minimizedCount);
    }

    if (poop == 'switchTab' && sameWindow) {
      switchTab(tabJump);
    }

  });


  console.log('got windows');

};

function countMinimized(count) {
  return count
}

function switchTab(jump) {
  if (jump == 1) {
    if (!ctrlPressed) {
      // alert('next tab');
      shortcutPolice('cycling to the next tab', 'ctrl + tab');
    }
  } else if (jump == -1) {
    if (!ctrlPressed && !shiftPressed) {
      // alert('previous tab');
      shortcutPolice('cycling to the previous tab', 'ctrl + shift + tab');
    }
  } else if (currentTabIndex == allWindows[currentWindowIndex].tabs.length - 1 && jump > 1) {
    if (!metaPressed) {
      // alert('last tab');
      shortcutPolice('jumping to the last tab', 'cmd + 9');
    }
  } else if ((jump > 1 || jump < -1) && currentTabIndex != allWindows[currentWindowIndex].tabs.length - 1 && currentTabIndex < 8) {
    if (!metaPressed) {
      // alert('jump tab');
      shortcutPolice('jumping to an open tab', 'cmd + tab number [1-8]');
    }
  }
  tabCreated = false;
}

function switchWindow(minimized) {

  if (minimized) {
    if (!metaPressed) {
      // alert('minimized');
      shortcutPolice('minimizing the current window', 'cmd + M');
    }

  } else {
    if (!windowClosing && !windowCreated) {
      if (!metaPressed) {
        // alert('switch window');
        shortcutPolice('cycling to the next open window', 'cmd + ~');
        // BOOKMARK cycle to previous window
      }

    }
  }
}

getWindows();

chrome.tabs.onCreated.addListener(function(tab) {
  console.log('tabs.onCreated, tab = ');
  console.log(tab);

  /*
      if same window
  */
  if (!windowCreated) {

    tabCreated = true;

    newUrl = tab.url;
    if (newUrl.startsWith('chrome:')) {
      switch (newUrl) {
        case 'chrome://newtab/':
          if (!metaPressed) {
            // alert('new tab');
            shortcutPolice('opening a new tab', 'cmd + T');
          }
          break;
        case 'chrome://settings/':
          if (!metaPressed) {
            // alert('open settings');
            shortcutPolice('opening the settings page', 'cmd + ,');
          }

          break;
          // case 'chrome://history/':
          //   if (!metaPressed){
          //     alert('open history');
          //   }
          //   break;
        case 'chrome://bookmarks/':
          if (!metaPressed && !altPressed) {
            // alert('open bookmarks');
            shortcutPolice('opening the bookmark manager', 'cmd + alt + B');
          }
          break;
        case 'chrome://downloads/':
          if (!metaPressed && !shiftPressed) {
            // alert('open downloads');
            shortcutPolice('opening the downloads page', 'cmd + shift + J');
          }
          break;
          // case 'chrome://settings/clearBrowserData':
          //   alert('open clear browser data');
          //   break;
      }
    } else if (newUrl.startsWith('view-source:')) {
      if (!metaPressed && !altPressed) {
        // alert('view source');
        shortcutPolice('viewing the current page source', 'cmd + alt + U');
      }

    /*
        if not special chrome page
    */
    } else {
      if (tab.url == lastClosedUrl && tab.url != 'chrome://newtab/') {
        if (!metaPressed && !shiftPressed) {
          // alert('tab reopened');
          shortcutPolice('reopening a closed tab', 'cmd + shift + T');
        }
        lastClosedUrl.shift(0, 1);
      } else {
        if (tab.selected) {
          if (!metaPressed && shiftPressed) {
            // alert('url opened in selected tab');
            shortcutPolice('opening a url in a new tab', "cmd + shift + click a link\nOR\nalt + enter from omnibox");
          }
        } else {
          if (!metaPressed) {
            // alert('url opened in background tab');
            shortcutPolice('opening a url in a new background tab', "cmd + click a link\nOR\ncmd + enter from omnibox");
          }

          // }
        }
      }
    }

  /*
      if new window
  */
  } else {
    if (lastClosedUrl.length == 1 && lastClosedUrl[0] == 'chrome://newtab/') {
      if (!metaPressed) {
        // alert('new window created');
        shortcutPolice('opening a new window', 'cmd + N');
      }
    } else if (lastClosedUrl.includes(tab.url)) {
      if (tab.url == filteredClosedUrls[0]) {
        if (!metaPressed && !shiftPressed) {
          // alert('tabs reopened');
          shortcutPolice('reopening a closed window', 'cmd + shift + T');
        }
      }
    } else {
      if (tab.url == 'chrome://newtab/') {
        if (tab.incognito) {
          if (!metaPressed && !shiftPressed) {
            // alert('new incognito window created');
            shortcutPolice('opening a new incognito window', 'cmd + shift + N');
          }
        } else {
          if (!metaPressed) {
            // alert('new window created');
            shortcutPolice('opening a new window', 'cmd + N');
          }
        }
      } else {
        if (!shiftPressed) {
          // alert('link opened in new window');
          shortcutPolice('opening a link in a new window', "shift + click a link\nOR\nshift + enter from omnibox");
        }

      }
    }
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('tabs.onUpdated, changeInfo = ');
  console.log(changeInfo);

  switch (changeInfo.url) {
    case 'chrome://settings/clearBrowserData':
      if (!metaPressed && !shiftPressed) {
        // alert('open clear browser data');
        shortcutPolice('opening the clear browser data page', 'cmd + shift + delete');
      }
      break;
    case 'chrome://history/':
      if (!metaPressed) {
        // alert('open history');
        shortcutPolice('opening your history', 'cmd + Y');
      }
  }

  if (!tabCreated && changeInfo.status == 'loading') {
    if (changeInfo.url == null) {
      // console.log('reload');
      if (!metaPressed) {
        // alert('reload');
        shortcutPolice('reloading the page', 'cmd + R');
      }
    }
  }

  if (changeInfo.status == 'complete') {
    windowCreated = false;
    tabCreated = false;
    console.log('resetting tabCreated / windowCreated');
  }

});

chrome.tabs.onZoomChange.addListener(function(zoomChangeInfo) {
  console.log('tabs.onZoomChange, zoomChangeInfo = ');
  console.log(zoomChangeInfo);

  // if (!tabCreated){
  if (zoomChangeInfo.newZoomFactor > zoomChangeInfo.oldZoomFactor) {
    if (!metaPressed) {
      // alert('zoom in');
      shortcutPolice('zooming in', "cmd + '+'");
    }
  } else if (zoomChangeInfo.newZoomFactor < zoomChangeInfo.oldZoomFactor) {
    if (!metaPressed) {
      // alert('zoom out');
      shortcutPolice('zooming out', "cmd + '-'");
    }

  }

});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('tabs.onActivated, activeInfo = ');
  console.log(activeInfo);

  if (allTabIds.includes(activeInfo.tabId)) {
    tabCreated = false;

  } else {
    tabCreated = true;
    console.log('key doesnt exist');
  }

  console.log('tab created? ', tabCreated);
  console.log('tab closing? ', tabClosing);
  if (!tabCreated && !tabClosing && !windowCreated && !windowClosing) {
    getWindows('switchTab');
    console.log('getting windows');
  }

  tabClosing = false;
});


var windowClosing = false;
var closingWindowId = 0;
var closedWindowIds = [];

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  console.log('tabs.onRemoved, tabId = ');
  console.log(tabId);
  console.log('removeInfo = ');
  console.log(removeInfo);



  if (removeInfo.isWindowClosing) {
    windowClosing = true;

    if (!closedWindowIds.includes(removeInfo.windowId)) {
      closedWindowIds.push(removeInfo.windowId);
      if (!metaPressed && !shiftPressed) {
        // alert('window closed');
        shortcutPolice('closing a window', 'cmd + shift + W');
      }
      getRecentlyClosed();
    }
    getWindows();
  } else {

    tabClosing = true;

    /*
        if closing window only had one tab
    */
    if (windowsObj.windwId == undefined) {
      windowClosing = true;
    }



    getRecentlyClosed();
    if (!metaPressed) {
      // alert('tab closed');
      shortcutPolice('closing a tab', 'cmd + W');
    }

    getWindows();
  }

});

var windowCreated = false;
var createdWindowId;
chrome.windows.onCreated.addListener(function(window) {
  console.log('windows.onCreated, window = ');
  console.log(window);

  windowCreated = true;
  createdWindowId = window.id;


});

chrome.windows.onFocusChanged.addListener(function(windowId) {
  console.log('windows.onFocusChanged, windowId = ');
  console.log(windowId);

  if (windowId != -1) {
    getWindows('switchWindow');
  } else if (windowClosing) {
    windowClosing = false;
  }

});

// chrome.windows.onRemoved.addListener(function(windowId){
//   console.log('windows.onRemoved, windowId = ');
//   console.log(windowId);
// });



chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
  console.log('bookmarks.onCreated, id = ');
  console.log(id);
  console.log('bookmark = ');
  console.log(bookmark);

  if (!metaPressed) {
    // alert('bookmark created');
    shortcutPolice('bookmarking a page', 'cmd + D');
  }

});

function getRecentlyClosed() {
  lastClosedUrl = [];

  chrome.sessions.getRecentlyClosed(function(sessions) {
    console.log('sessions.getRecentlyClosed, sessions = ');
    console.log(sessions);

    if (sessions[0].window) {
      for (var i = 0; i < sessions[0].window.tabs.length; i++) {
        lastClosedUrl.push(sessions[0].window.tabs[i].url);
      }
      filteredClosedUrls = lastClosedUrl.filter(function(element) {
        return element !== 'chrome://newtab/';
      });
    } else {
      lastClosedUrl.push(sessions[0].tab.url);
    }

  });

};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message) {
    case 'metaKeyDown':
      metaPressed = true;
      break;
    case 'altKeyDown':
      altPressed = true;
      break;
    case 'shiftKeyDown':
      shiftPressed = true;
      break;
    case 'ctrlKeyDown':
      ctrlPressed = true;
      break;
    case 'metaKeyUp':
      metaPressed = false;
      break;
    case 'altKeyUp':
      altPressed = false;
      break;
    case 'shiftKeyUp':
      shiftPressed = false;
      break;
    case 'ctrlKeyUp':
      ctrlPressed = false;
      break;
  }
  console.log(message);
  setTimeout(resetKeys, 500);
});

function resetKeys() {
  metaPressed = false;
  altPressed = false;
  shiftPressed = false;
  ctrlPressed = false;
  console.log('keys reset');
}

function shortcutPolice(action, shortcut) {
  alert("Did you know there's a shortcut for " + action + "?\n\n" + shortcut + "\n\nBut remember, there are no shortcuts in life.");
}