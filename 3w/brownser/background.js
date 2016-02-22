console.log('brownsing');

var burpURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/burp.wav';
var fartURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/fart.wav';
var snortURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/snort.wav';
var whistleURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/whistle.wav';
var slapURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/slap.wav';
var pokeURL = 'https://dl.dropboxusercontent.com/u/1177096/3w/poke.wav';

var burp = new Tone.Player({
  "url": burpURL,
  "retrigger": true
}).toMaster();

var fart = new Tone.Player({
  "url": fartURL,
  "retrigger": true
}).toMaster();

var snort = new Tone.Player({
  "url": snortURL,
  "retrigger": true
}).toMaster();

var whistle = new Tone.Player({
  "url": whistleURL,
  "retrigger": true
}).toMaster();

var slap = new Tone.Player({
  "url": slapURL,
  "retrigger": true
}).toMaster();

var poke = new Tone.Player({
  "url": pokeURL,
  "retrigger": true
}).toMaster();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.click) {
      if (request.type == 'a') {
        slap.start();
      } else {
        poke.start();
      }
    } else if (request.keyCode == 32 || request.keyCode == 13) {
      fart.start();
    } else if (request.keyCode >= 65 && request.keyCode <= 90) {
      if (request.shiftKey) {
        snort.start();
      } else {
        burp.start();
      };
    } else if (request.keyCode != 16) {
      whistle.start();
    };
  });