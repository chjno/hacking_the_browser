console.log('begin living and learning 1');

var openTabs = [];
var openWindows = [];
var allTabIds = [];
var allWindowIds = [];
var currentTabIndex = 0;
var currentWindowIndex = 0;
var tabJump = 0;
var sameWindow = true;
var windowClosed = false;

function getWindows(poop, poopy) {

  chrome.windows.getAll({populate: true}, function(getInfo){
    // console.log(getInfo);
    // if (getInfo.length < openWindows.length){
    //   windowClosed = true;
    // }

    openWindows = getInfo;
    for (i = 0; i < openWindows.length; i++){
      allWindowIds.push(openWindows[i].id);
      if (openWindows[i].focused){
        if (currentWindowIndex == i){
          sameWindow = true;
        } else {
          sameWindow = false;
        }
        currentWindowIndex = i;

      }


      for (j = 0; j < openWindows[i].tabs.length; j++){
        allTabIds.push(openWindows[i].tabs[j].id);
        if (currentWindowIndex == i && openWindows[i].tabs[j].selected){
          tabJump = j - currentTabIndex;
          currentTabIndex = j;
        }
      }
    }


    // console.log('window closed = ' + windowClosed);
    // this runs more than once when there was more than one tab open in a closed window
    // if (windowIsClosing){
      // knowsCloseWindow = knows(knowsCloseWindow, 'cmd + shift + W');
    // } else {
// these are running even when one is false
    if (poop == 'switchTab'){
      switchTab();
    }

    if (poop == 'switchWindow' && !newWindow){
      switchWindow(poopy);
    }

    // }

    // windowIsClosing = false;
  });
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

  if (newWindow){
    if (tab.url == 'chrome://newtab/'){
      knowsNewWindow = knows(knowsNewWindow, 'cmd + N');
    } else {
      knowsOpenLinkInNewWindow = knows(knowsOpenLinkInNewWindow, 'shift + click link');
    }
    newWindow = false;
  } else {
    if (tab.selected && tab.url == 'chrome://newtab/' && allWindowIds.includes(tab.windowId)){ // && it's not a new window
      knowsNewTab = knows(knowsNewTab, 'cmd + T');
    } else if (tab.url != 'chrome://newtab/' && allWindowIds.includes(tab.windowId)) {
      knowsNewTabBackground = knows(knowsNewTabBackground, 'cmd + lick link');
    }
  }

  getWindows();
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
  // activeInfo == {tabId, windowId}

  if (allWindowIds.includes(activeInfo.windowId) && allTabIds.includes(activeInfo.tabId)){
    getWindows('switchTab');
  }
});

function switchTab(){
  if (!windowClosed){
    if (tabJump == 1){
      knowsTabRight = knows(knowsTabRight, 'ctrl + tab');
    } else if (tabJump == -1 || tabJump == openWindows[currentWindowIndex].tabs.length){ // && tab wasn't closed
      knowsTabLeft = knows(knowsTabLeft, 'ctrl + shift + tab');
    } else if (currentTabIndex == openWindows[currentWindowIndex].tabs.length - 1 && tabJump > 1) {
      knowsTabLast = knows(knowsTabLast, 'cmd + 9');
    } else if ((tabJump > 1 || tabJump < -1) && currentTabIndex != openWindows[currentWindowIndex].tabs.length - 1 && currentTabIndex < 8){
      knowsTabJump = knows(knowsTabJump, 'cmd + [1-8]');
    }
  }
  windowClosed = false;
}


// don't prompt if window was closed
chrome.windows.onFocusChanged.addListener(function(windowId){
  getWindows('switchWindow', windowId);

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
  console.log(removeInfo);
  if (removeInfo.isWindowClosing){
    windowClosed = true;
    if (closingWindowId != removeInfo.windowId){
      closingWindowId = removeInfo.windowId;
      knowsCloseWindow = knows(knowsCloseWindow, 'cmd + shift + W');
    }
  } else {
    for (i = 0; i < openWindows.length; i++){
      if (openWindows[i].id == removeInfo.windowId){
        if (openWindows[i].tabs.length != 1){
          windowClosed = true;
        }
      }
    }
    knowsCloseTab = knows(knowsCloseTab, 'cmd + W');
  }

  
  // if (!removeInfo.isWindowClosing){
  //   knowsCloseTab = knows(knowsCloseTab, 'cmd + W');
  // } else {
  //   windowIsClosing = true;
  //   if (closingWindowId != removeInfo.windowId){
  //     knowsCloseWindow = knows(knowsCloseWindow, 'cmd + shift + W');
  //     // closingWindowId = removeInfo.windowId;
  //   }  
  // }
});


// open new window
// don't prompt if url != new tab page
var knowsNewWindow = false;
var knowsOpenLinkInNewWindow = false;
var newWindow = false;
chrome.windows.onCreated.addListener(function(window){
  newWindow = true;
});



// chrome.windows.onRemoved.addListener(function(windowId){
//   console.log('window closed');
// });



