console.log('content.js version: 2');

$(document).keydown(function(event) {
    chrome.runtime.sendMessage({keyCode: event.keyCode});
    console.log(event);
});

// content.js
// chrome.runtime.onMessage.addListener(
//     function(message, sender, sendResponse) {
//         console.log('Got message from background: ', message);

//         // `message` will be whatever background.js sent, such as:
//         // {"changeColor": true, "color": "red"}

//         // We ignore the contents of the message here and simply set
//         // every paragraph to red
//         $('p').css({'background-color': 'red'});
//     }
// );
