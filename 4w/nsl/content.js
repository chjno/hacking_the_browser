console.log('begin living and learning');

var metaPressed = false;
var altPressed = false;
var shiftPressed = false;
var ctrlPressed = false;

$(document).keydown(function(event) {

  if (event.metaKey){
    if (!metaPressed){
      metaPressed = true;
      chrome.runtime.sendMessage('metaKeyDown');  
    }
  };

  if (event.altKey){
    if (!altPressed){
      altPressed = true;
      chrome.runtime.sendMessage('altKeyDown');  
    }
  };

  if (event.shiftKey){
    if (!shiftPressed){
      shiftPressed = true;
      chrome.runtime.sendMessage('shiftKeyDown');  
    }
  };

  if (event.ctrlKey){
    if (!ctrlPressed){
      ctrlPressed = true;
      chrome.runtime.sendMessage('ctrlKeyDown');  
    }
  };

});

$(document).keyup(function(event) {
  
  if (!event.metaKey){
    if (metaPressed){
      metaPressed = false;
      chrome.runtime.sendMessage('metaKeyUp');
    }
  }

  if (!event.altKey){
    if (altPressed){
      altPressed = false;
      chrome.runtime.sendMessage('altKeyUp');
    }
  }

  if (!event.shiftKey){
    if (shiftPressed){
      shiftPressed = false;
      chrome.runtime.sendMessage('shiftKeyUp');
    }
  }

  if (!event.ctrlKey){
    if (ctrlPressed){
      ctrlPressed = false;
      chrome.runtime.sendMessage('ctrlKeyUp');
    }
  }
});