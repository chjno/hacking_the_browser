console.log('background version 2');

function BufferLoader(context, urlList) {
    "use strict";
    this.context = context;
    this.urlList = urlList;
    this.bufferList = new ArrayBuffer(0);
    this.loadCount = 0;
}
BufferLoader.prototype.loadBuffer = function (url, index) {
    "use strict";
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
     bufferLoader.context.decodeAudioData(
            request.response,
            function onSuccess(buffer) {bufferLoader.bufferList[index] = buffer;}, 
         function onFailure() { alert("Decoding the audio buffer failed");} 
      );
request.onload=null;
request= null;
    };
    request.send();
}
BufferLoader.prototype.load = function () {
    "use strict";
    for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

function playSound(i) {
if (enableSound[i])
 { 
  var source = context.createBufferSource();
  source.buffer = bufferLoader.bufferList[i];
var gainNode = context.createGain();
  source.connect(gainNode);
gainNode.gain.value=soundsVolume[i]*generalVolume;
    gainNode.connect(context.destination);
  source.start(0);
source=null;
gainNode=null;
 }
}

var  context= new AudioContext();
  var bufferLoader = new BufferLoader(context,  ['sounds/fart.wav', 'sounds/burp.wav', 'sounds/snort.wav', 'sounds/whistle.wav']);
  bufferLoader.load();
var soundsVolume=new Array(bufferLoader.urlList.length);
var enableSound=new Array(bufferLoader.urlList.length);
var generalVolume;
     if (localStorage.volume === undefined) 
  {
    localStorage.volume=50;
   }

for(var i=0;i<bufferLoader.urlList.length;i++)
{
 if (localStorage.getItem(i) === null) 
  {
    localStorage.setItem(i,1);
   }
     if (localStorage.getItem("sound"+i) === null) 
  {
    localStorage.setItem("sound"+i,true);
   }
 }
changeSettings("");
function changeSettings(request) {
for(var i=0;i<soundsVolume.length;i++)
{
    soundsVolume[i]=localStorage.getItem(i);
    enableSound[i]=JSON.parse(localStorage.getItem("sound"+i));
 }
   generalVolume=localStorage.volume/100;
  }

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.keyCode == 32) {
      playSound(0);
    } else if (request.keyCode >= 65 && request.keyCode <= 90 || request.keyCode >= 97 && request.keyCode <= 122) {
      playSound(1)
    }
  });

// chrome.tabs.onUpdated.addListener(function() { playSound(0);});
// chrome.tabs.onSelectionChanged.addListener(function(tab) { playSound(1);});