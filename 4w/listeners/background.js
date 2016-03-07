console.log("begin living and learning 1");

chrome.tabs.onCreated.addListener(function(tab) {
  console.log("chrome.tabs.onCreated\n\n", 'tab: ', tab);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("chrome.tabs.onUpdated\n\n",
    'tabId: ', tabId, "\n\n",
    'changeInfo: ', changeInfo, "\n\n",
    'tab: ', tab);
});

chrome.tabs.onZoomChange.addListener(function(zoomChangeInfo) {
  console.log("chrome.tabs.onZoomChange\n\n",
    'zoomChangeInfo: ', zoomChangeInfo);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log("chrome.tabs.onActivated\n\n",
    'activeInfo: ', activeInfo);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  console.log("chrome.tabs.onRemoved\n\n",
    'tabId: ', tabId, "\n\n",
    'removeInfo: ', removeInfo);
});

chrome.windows.onCreated.addListener(function(window) {
  console.log("chrome.windows.onCreated\n\n",
    'window: ', window);
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
  console.log("chrome.windows.onFocusChanged\n\n",
    'windowId: ', windowId);
});

chrome.windows.onRemoved.addListener(function(windowId){
  console.log("chrome.windows.onRemoved\n\n",
    'windowId: ', windowId);
});

chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
  console.log("chrome.bookmarks.onCreated\n\n",
    'id: ', id, "\n\n",
    'bookmark: ', bookmark);
});

function getWindows(){
  chrome.windows.getAll({ populate: true }, function(windows) {
    console.log("chrome.windows.getAll\n\n",
      'windows: ', windows);
  });
}

function getRecentlyClosed(){
  chrome.sessions.getRecentlyClosed(function(sessions) {
    console.log("chrome.sessions.getRecentlyClosed\n\n",
      'sessions: ',sessions);
  });
}