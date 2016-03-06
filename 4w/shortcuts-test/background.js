console.log('begin living and learning 1');

/*
to reset

tabCreated = false;
*/

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

function getWindows(poop){
  chrome.windows.getAll({populate: true}, function(windows){

    var sameWindow;
    var windowMinimized;
    minimizedCount = 0;

    allWindows = windows;
    for (i = 0; i < allWindows.length; i++){

      windowsObj[allWindows[i].id] = [];

      if (allWindows[i].focused){
        if (currentWindowIndex == i){
          sameWindow = true;
        } else {
          sameWindow = false;
        }
        currentWindowIndex = i;
        currentWindowId = allWindows[i].id;
      } else {

        // BOOKMARK

        if (allWindows[i].state == 'minimized'){
          minimizedCount++;
        }
      }


      for (j = 0; j < allWindows[i].tabs.length; j++){
        allTabIds.push(allWindows[i].tabs[j].id);

        windowsObj[allWindows[i].id].push(allWindows[i].tabs[j].id);

        if (currentWindowIndex == i && allWindows[i].tabs[j].selected){
          if (tabJump == undefined){
            tabJump = 0;
          } else {
            tabJump = j - currentTabIndex;
          }
          currentTabIndex = j;
          currentTabId = allWindows[i].tabs[j].id;
        }
      }
    }

    if (currentMinimizedCount != null){
      if (minimizedCount > currentMinimizedCount){
        // minimized
        switchWindow(true);
      } else if (minimizedCount == currentMinimizedCount && !sameWindow){
        switchWindow(false); 
      }
      currentMinimizedCount = countMinimized(minimizedCount);
    } else {
      currentMinimizedCount = countMinimized(minimizedCount);
    }


    // switch (poop){
    //   case 'switchTab':
    //     switchTab();
    //     break;
    //   case 'switchWindow':

    // }
    if (poop == 'switchTab' && sameWindow){
      switchTab(tabJump);
    } 

  });

  
  console.log('got windows');

  // tabClosing = false;
  // windowClosing = false;
};

function countMinimized(count){
  return count
}

function switchTab(jump){
  // console.log(jump);
  if (jump == 1){
    alert('next tab');
  } else if (jump == -1){
    alert('previous tab');
  } else if (currentTabIndex == allWindows[currentWindowIndex].tabs.length - 1 && jump > 1) {
    alert('last tab');
  } else if ((jump > 1 || jump < -1) && currentTabIndex != allWindows[currentWindowIndex].tabs.length - 1 && currentTabIndex < 8){
    alert('jump tab');
  }
  tabCreated = false;
  // jump = null;
}

function switchWindow(minimized){

  if (minimized){
    alert('minimized');
  } else {
    if (!windowClosing && !windowCreated){
      alert('switch window');
    }
  }
}

getWindows();

chrome.tabs.onCreated.addListener(function(tab){
  console.log('tabs.onCreated, tab = ');
  console.log(tab);

  if (!windowCreated){

    tabCreated = true;

    newUrl = tab.url;
    if (newUrl.startsWith('chrome:')){
      switch (newUrl){
        case 'chrome://newtab/':
          alert('new tab');
          break;
        case 'chrome://settings/':
          alert('open settings');
          break;
        case 'chrome://history/':
          alert('open history');
          break;
        case 'chrome://bookmarks/':
          alert('open bookmarks');
          break;
        case 'chrome://downloads/':
          alert('open downloads');
          break;
        // case 'chrome://settings/clearBrowserData':
        //   alert('open clear browser data');
        //   break;
      }
    } else if (newUrl.startsWith('view-source:')){
      alert('view source');
    } else {
      if (tab.url == lastClosedUrl && tab.url != 'chrome://newtab/'){
        alert('tab reopened');
        lastClosedUrl.shift(0,1);
      } else {
        // if (tab.selected){
          // alert('url opened in selected tab');
        // } else {
          alert('url opened in background tab');
        // }
      }
    }
  } else { // window created
    if (lastClosedUrl.length == 1 && lastClosedUrl[0] == 'chrome://newtab/'){
      alert('new window created');
    } else if (lastClosedUrl.includes(tab.url)){
      if (tab.url == filteredClosedUrls[0]){
        alert('tabs reopened');
      }
    } else {
      if (tab.url == 'chrome://newtab/'){
        // cmd + N
        if (tab.incognito){
          alert('new incognito window created');
        } else {
          alert('new window created');
        }
      } else {
        // shift + click ???
        alert('link opened in new window');
      }
      // windowCreated = false;
    }
  }

  // getWindows();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  console.log('tabs.onUpdated, changeInfo = ');
  console.log(changeInfo);

  if (changeInfo.url == 'chrome://settings/clearBrowserData'){
    alert('open clear browser data');
  }

  if (!tabCreated && changeInfo.status == 'loading'){
    if (changeInfo.url == null){
      // console.log('reload');
      alert('reload');
    } else {
      // url = changeInfo.url;
    }
  }

  // if (!windowCreated){

  // }

  if (changeInfo.status == 'complete'){
    windowCreated = false;
    tabCreated = false;
    console.log('resetting tabCreated / windowCreated');
  }



});

chrome.tabs.onZoomChange.addListener(function(zoomChangeInfo){
  console.log('tabs.onZoomChange, zoomChangeInfo = ');
  console.log(zoomChangeInfo);

  // if (!tabCreated){
    if (zoomChangeInfo.newZoomFactor > zoomChangeInfo.oldZoomFactor){
      alert('zoom in');
    } else if (zoomChangeInfo.newZoomFactor < zoomChangeInfo.oldZoomFactor){
      alert('zoom out');
    }
  // }


  // if (!windowCreated){

  // }




});

chrome.tabs.onActivated.addListener(function(activeInfo){
  console.log('tabs.onActivated, activeInfo = ');
  console.log(activeInfo);

  if (allTabIds.includes(activeInfo.tabId)){
    tabCreated = false;

  } else {
    tabCreated = true;
    console.log('key doesnt exist');
  }

  console.log('tab created? ', tabCreated);
  console.log('tab closing? ', tabClosing);
  if (!tabCreated && !tabClosing && !windowCreated && !windowClosing){
    getWindows('switchTab');
    console.log('getting windows');
  }

  tabClosing = false;
});


var windowClosing = false;
var closingWindowId = 0;
var closedWindowIds = [];

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log('tabs.onRemoved, tabId = ');
  console.log(tabId);
  console.log('removeInfo = ');
  console.log(removeInfo);

  
  
  if (removeInfo.isWindowClosing){
    windowClosing = true;
    // ignore tabs.onActivated and windows.onFocusChanged until getRecentlyClosed();

    if (!closedWindowIds.includes(removeInfo.windowId)){
      closedWindowIds.push(removeInfo.windowId);
      alert('window closed');
      getRecentlyClosed();
    }
    getWindows();
  } else {

    tabClosing = true;

    // if closing window only had one tab
    if (windowsObj.windwId == undefined){
      windowClosing = true;
    }



    getRecentlyClosed();

    alert('tab closed');
    getWindows();
  }

  // getWindows();

});

var windowCreated = false;
var createdWindowId;
chrome.windows.onCreated.addListener(function(window){
  console.log('windows.onCreated, window = ');
  console.log(window);

  windowCreated = true;
  createdWindowId = window.id;


});

// var windowMinimizing;
chrome.windows.onFocusChanged.addListener(function(windowId){
  console.log('windows.onFocusChanged, windowId = ');
  console.log(windowId);

  if (windowId != -1){
    getWindows('switchWindow');
  } else if (windowClosing){
    windowClosing = false;
  }

});

// chrome.windows.onRemoved.addListener(function(windowId){
//   console.log('windows.onRemoved, windowId = ');
//   console.log(windowId);
// });



chrome.bookmarks.onCreated.addListener(function(id, bookmark){
  console.log('bookmarks.onCreated, id = ');
  console.log(id);
  console.log('bookmark = ');
  console.log(bookmark);

  alert('bookmark created');
  // cmd + D
});



chrome.runtime.onStartup.addListener(function(){
  console.log('runtime.onStartup');
});

function getRecentlyClosed(){
  lastClosedUrl = [];

  chrome.sessions.getRecentlyClosed(function(sessions){
    console.log('sessions.getRecentlyClosed, sessions = ');
    console.log(sessions);

    if (sessions[0].window){
      for (var i = 0; i < sessions[0].window.tabs.length; i++){
        lastClosedUrl.push(sessions[0].window.tabs[i].url);
      }
      filteredClosedUrls = lastClosedUrl.filter(function(element){
        return element !== 'chrome://newtab/';
      });
    } else {
      lastClosedUrl.push(sessions[0].tab.url);
    }

  });

  // windowClosing = false;
  // tabClosing = false;
};