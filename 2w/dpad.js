var s = document.createElement('script');
s.onload=launch;
s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js');
document.body.appendChild(s);
void(0);
window.open("", "myWindow", "width=100, height=100").document.write("<div><button onclick='window.opener.scrollBy(0,-100)'>up</button></div><div><button onclick='window.opener.scrollBy(-100,0)'>left</button><button onclick='window.opener.scrollBy(100,0)'>right</button></div><div><button onclick='window.opener.scrollBy(0,100)'>down</button></div>");
function launch() {
  $("body").css("overflow", "hidden");
}