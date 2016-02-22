console.log('content.js version: 3');

$(document).keydown(function(event) {
  console.log(event);
});

$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'https://www.freesound.org/data/previews/192/192271_3509815-lq.mp3');
    // audioElement.setAttribute('autoplay', 'autoplay');
    //audioElement.load()

    $.get();

    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);

    $(document).keydown(function(event) {
      console.log(event);
      audioElement.play();
    });

    // $('.play').click(function() {
    //     audioElement.play();
    // });

    // $('.pause').click(function() {
    //     audioElement.pause();
    // });
});



// content.js
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log('Got message from background: ', message);

    // `message` will be whatever background.js sent, such as:
    // {"changeColor": true, "color": "red"}

    // We ignore the contents of the message here and simply set
    // every paragraph to red
    $('p').css({'background-color': 'red'});
  }
);
