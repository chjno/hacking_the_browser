console.log('brownsing');

$(document).keydown(function(event) {
	console.log(event);
    chrome.runtime.sendMessage({keyCode: event.keyCode, shiftKey: event.shiftKey});
});

$(document).click(function(event) {
	console.log(event);
	chrome.runtime.sendMessage({click: true, type: event.target.localName});
});

// $('a').click(function(event) {
// 	console.log(event);
// 	chrome.runtime.sendMessage({click: true, type: 'link'});
// });