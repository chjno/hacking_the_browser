console.log('content.js version: 1');

// content.js
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log('Got message from background: ', message);

    window.open("", "myWindow", "width=100, height=100").document.write("<div><button onclick='window.opener.scrollBy(0,-100)'>up</button></div><div><button onclick='window.opener.scrollBy(-100,0)'>left</button><button onclick='window.opener.scrollBy(100,0)'>right</button></div><div><button onclick='window.opener.scrollBy(0,100)'>down</button></div>");
    $("body").css("overflow", "hidden");
  }
);