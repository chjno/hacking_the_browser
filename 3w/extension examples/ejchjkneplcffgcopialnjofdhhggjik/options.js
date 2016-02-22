function saveOptions() {
    localStorage.volume= document.getElementById("fader").value;
    var status = document.getElementById("status");
       localStorage.setItem("sound"+0,document.getElementById("loadSound").checked);
     localStorage.setItem("sound"+1,document.getElementById("switchSound").checked);
    localStorage.setItem(0,1);
     localStorage.setItem(1,1);
    chrome.runtime.sendMessage({greeting: "hello"});
    status.innerText = chrome.i18n.getMessage("saved");
    setTimeout(function () { status.innerText = ""; }, 1500);
}
function restoreOptions() {
  document.getElementById("fader").value=localStorage.volume;
    document.getElementById("volume").value=localStorage.volume+"%";
    document.getElementById("fader").onchange=outputUpdate;
document.getElementById("loadSound").checked=JSON.parse(localStorage.getItem("sound"+0));
document.getElementById("switchSound").checked =JSON.parse(localStorage.getItem("sound"+1));
document.getElementById("ht").dir =chrome.i18n.getMessage("@@bidi_dir");
document.getElementById("checkSound").innerText= chrome.i18n.getMessage("check");
document.getElementById("vol").innerText = chrome.i18n.getMessage("volume");
document.getElementById("refrashSound").innerText = chrome.i18n.getMessage("loadingSound");
document.getElementById("switchTabs").innerText = chrome.i18n.getMessage("switchTabsSound");
  var saveButton = document.getElementById("saveButton");
saveButton.innerText = chrome.i18n.getMessage("save");
saveButton.onclick = saveOptions;
}
function outputUpdate() {
 document.getElementById("volume").value =document.getElementById("fader").value+"%";
}

document.addEventListener('DOMContentLoaded', restoreOptions);

if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler, false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
else {
    document.attachEvent("onmousewheel", MouseWheelHandler);
}   

function MouseWheelHandler(e) {

    var e = window.event || e;
        document.getElementById("fader").value -= e.wheelDelta/40;  
    outputUpdate();
}