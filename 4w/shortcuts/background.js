console.log('begin living and learning 1');

var openTabs = [];
var currentTabIndex = 0;
var currentWindowId = 0;

function getWindow(poop) {
  chrome.windows.getCurrent({populate: true}, function(window){
    // console.log(window);
    currentWindowId = window.id;
    openTabs = window.tabs;
    for (i = 0; i < openTabs.length; i++){
      if (openTabs[i].selected){
        currentTabIndex = i;
      }
    }
    if (poop){
      wait();
    };
    // console.log(openTabs);
    //console.log('current tab index ' + currentTabIndex);
  });
}
getWindow();

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
// don't prompt if url == settings, bookmarks, etc.
var knowsNewTab = false;
var knowsNewTabBackground = false;
chrome.tabs.onCreated.addListener(function(tab){
  if (tab.selected){
    knowsNewTab = knows(knowsNewTab, 'cmd + T');
  } else {
    knowsNewTabBackground = knows(knowsNewTabBackground, 'cmd + lick link');
  }

  getWindow();
});


// change tab
// adjacent tab forward/back
// jump to tab
// change window
// disable if new tab/window opened & closed
var knowsTabRight = false;
var knowsTabLeft = false;
var knowsTabLast = false;
var knowsTabJump = false;
var knowsChangeWindow = false;
var prevTabIndex = 0;
var prevWindowId = 0;
chrome.tabs.onActivated.addListener(function(tab){
  console.log(tab);

  // fix these so changing the original variable doesn't change the new one
  (function(_a){
    prevTabIndex = _a;
    // console.log(prevTabIndex);
  })(currentTabIndex);

  (function(_b){
    prevWindowId = _b;
  })(currentWindowId);
  // var prevTabIndex = currentTabIndex;
  // var prevWindowId = currentWindowId;
  getWindow(true);
  //console.log(currentTabIndex);

  // console.log('prev tab ' + prevTabIndex);
  // console.log('prev win ' + prevWindowId);
  // console.log('currentTabIndex ' + currentTabIndex);

  if (currentWindowId == prevWindowId){
      if (currentTabIndex - prevTabIndex == 1){
        knowsTabRight = knows(knowsTabRight, 'ctrl + tab');
      } else if (currentTabIndex - prevTabIndex == -1){
        knowsTabLeft = knows(knowsTabLeft, 'ctrl + shift + tab');
      } else if (currentTabIndex == openTabs.length) {
        knowsTabLast = knows(knowsTabLast, 'cmd + 9');
      } else {
        knowsTabJump = knows(knowsTabJump, 'cmd + [1-8]');
      }
  } else {
    knowsChangeWindow = knows(knowsChangeWindow, 'cmd + ~');
  }
});

var wait = function(){
  console.log(currentWindowId, prevWindowId ,currentTabIndex, prevTabIndex);
  compareId(currentWindowId, prevWindowId ,currentTabIndex, prevTabIndex);
};

var compareId = function(_cId, _pId, _cIndex, _pIndex){
  if (_cId == _pId){
      if (_cIndex - _pIndex == 1){
        knowsTabRight = knows(knowsTabRight, 'ctrl + tab');
      } else if (_cIndex - _pIndex == -1){
        knowsTabLeft = knows(knowsTabLeft, 'ctrl + shift + tab');
      } else if (_cIndex == openTabs.length) {
        knowsTabLast = knows(knowsTabLast, 'cmd + 9');
      } else {
        knowsTabJump = knows(knowsTabJump, 'cmd + [1-8]');
      }
  } else {
    knowsChangeWindow = knows(knowsChangeWindow, 'cmd + ~');
  }
};


// close tab || window
// breaks when multiple windows
var knowsCloseTab = false;
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if (!removeInfo.isWindowClosing){
    knowsCloseTab = knows(knowsCloseTab, 'cmd + W');
  } else {
    knowsCloseWindow = knows(knowsCloseWindow, 'cmd + shift + W');
  }

  getWindow();
});


// open new window
var knowsNewWindow = false;
chrome.windows.onCreated.addListener(function(){
  knowsNewWindow = knows(knowsNewWindow, 'cmd + N');
});