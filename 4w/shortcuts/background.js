// var test;

// switch(test){
//   case 'what':
//   break;

// }

console.log('begin living and learning 1');

var allTabsArray = [];
var allWindowsArray = [];
var allTabIds = [];
var allWindowIds = [];

var currentTabId = 0;
var currentWindowId = 0;
var currentTabIndex = 0;
var currentWindowIndex = 0;

var tabJump = 0;
var sameWindow = true;
var windowClosed = false;

function getWindows(poop, poopy) {

  chrome.windows.getAll({populate: true}, function(getInfo){
    // console.log(getInfo);
    // if (getInfo.length < allWindowsArray.length){
    //   windowClosed = true;
    // }

    allWindowsArray = getInfo;
    for (i = 0; i < allWindowsArray.length; i++){
      allWindowIds.push(allWindowsArray[i].id);
      if (allWindowsArray[i].focused){
        if (currentWindowIndex == i){
          sameWindow = true;
        } else {
          sameWindow = false;
        }
        currentWindowIndex = i;
        currentWindowId = allWindowsArray[i].id;
      }


      for (j = 0; j < allWindowsArray[i].tabs.length; j++){
        allTabIds.push(allWindowsArray[i].tabs[j].id);
        if (currentWindowIndex == i && allWindowsArray[i].tabs[j].selected){
          tabJump = j - currentTabIndex;
          currentTabIndex = j;
          currentTabId = allWindowsArray[i].tabs[j].id;
        }
      }
    }


    // if (poop == 'switchTab'){
    //   switchTab();
    // }

    // if (poop == 'switchWindow' && !newWindow){
    //   switchWindow(poopy);
    // }


  });

  console.log('got windows');

}
getWindows();

function knows(knowsWhat, shortcut){
  if (!knowsWhat){
    if (confirm("Did you know there's a shortcut for that?\n\n" + shortcut + "\n\nBut remember, there are no shortcuts in life.")){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}


// open new tab
// don't prompt if new window
// don't prompt if url == settings, bookmarks, etc.
var knowsNewTab = false;
var knowsNewTabBackground = false;
chrome.tabs.onCreated.addListener(function(tab){
  console.log('tabs.onCreated, tab = ' + tab);

  // if (newWindow){
  //   if (tab.url == 'chrome://newtab/'){
  //     knowsNewWindow = knows(knowsNewWindow, 'cmd + N');
  //   } else {
  //     knowsOpenLinkInNewWindow = knows(knowsOpenLinkInNewWindow, 'shift + click link');
  //   }
  //   newWindow = false;
  // } else {
  //   if (tab.selected && tab.url == 'chrome://newtab/' && allWindowIds.includes(tab.windowId)){ // && it's not a new window
  //     knowsNewTab = knows(knowsNewTab, 'cmd + T');
  //   } else if (tab.url != 'chrome://newtab/' && allWindowIds.includes(tab.windowId)) {
  //     knowsNewTabBackground = knows(knowsNewTabBackground, 'cmd + lick link');
  //   }
  // }

  // getWindows();
});


// disable if tab/window closed
var knowsTabRight = false;
var knowsTabLeft = false;
var knowsTabLast = false;
var knowsTabJump = false;
var knowsChangeWindow = false;
var prevTabIndex = 0;
var prevWindowId = 0;
chrome.tabs.onActivated.addListener(function(activeInfo){
  console.log('tabs.onActivated, activeInfo = ' + activeInfo);

  // if (allWindowIds.includes(activeInfo.windowId) && allTabIds.includes(activeInfo.tabId)){
  //   getWindows('switchTab');
  // }
});

function switchTab(){
  if (!windowClosed){
    if (tabJump == 1){
      knowsTabRight = knows(knowsTabRight, 'ctrl + tab');
    } else if (tabJump == -1 || tabJump == allWindowsArray[currentWindowIndex].tabs.length){ // && tab wasn't closed
      knowsTabLeft = knows(knowsTabLeft, 'ctrl + shift + tab');
    } else if (currentTabIndex == allWindowsArray[currentWindowIndex].tabs.length - 1 && tabJump > 1) {
      knowsTabLast = knows(knowsTabLast, 'cmd + 9');
    } else if ((tabJump > 1 || tabJump < -1) && currentTabIndex != allWindowsArray[currentWindowIndex].tabs.length - 1 && currentTabIndex < 8){
      knowsTabJump = knows(knowsTabJump, 'cmd + [1-8]');
    }
  }
  windowClosed = false;
}


// don't prompt if window was closed
chrome.windows.onFocusChanged.addListener(function(windowId){
  console.log('windows.onFocusChanged, windowId = ' + windowId);

  // getWindows('switchWindow', windowId);

});

function switchWindow(windowId){
  if (windowId != -1 && allWindowIds.includes(windowId) && !windowClosed){
    knowsChangeWindow = knows(knowsChangeWindow, 'cmd + ~');
  };
  windowClosed = false;
}



// close tab || window
// don't prompt multiple times when closing multiple tabs in one window
var knowsCloseTab = false;
var knowsCloseWindow = false;
var closingWindowId;
var tabsRemoved = false;
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log('tabs.onRemoved, tabId = ' + tabId + ', removeInfo = ' + removeInfo);

  // if (removeInfo.isWindowClosing){
  //   windowClosed = true;
  //   if (closingWindowId != removeInfo.windowId){
  //     closingWindowId = removeInfo.windowId;
  //     knowsCloseWindow = knows(knowsCloseWindow, 'cmd + shift + W');
  //   }
  // } else {
  //   for (i = 0; i < allWindowsArray.length; i++){
  //     if (allWindowsArray[i].id == removeInfo.windowId){
  //       if (allWindowsArray[i].tabs.length != 1){
  //         windowClosed = true;
  //       }
  //     }
  //   }
  //   knowsCloseTab = knows(knowsCloseTab, 'cmd + W');
  // }
});


// open new window
// don't prompt if url != new tab page
var knowsNewWindow = false;
var knowsOpenLinkInNewWindow = false;
var newWindow = false;
chrome.windows.onCreated.addListener(function(window){
  console.log('windows.onCreated, window = ' + window);

  // newWindow = true;
});



// chrome.windows.onRemoved.addListener(function(windowId){
//   console.log('window closed');
// });



