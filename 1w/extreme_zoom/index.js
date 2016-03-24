'use strict';

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
  alert('User Media API not supported.');
}

function getStream(type) {
  var constraints = {};
  constraints[type] = true;
  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector(type);
    if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
  }, function (err) {
    alert('Error: ' + err);
  });
}

window.onload = function () {
  getStream('video');
  locate();
};

///////////////////
///////////////////

function checkSupportFor(name, propertyName) {
  var propertyOwner = arguments.length <= 2 || arguments[2] === undefined ? window : arguments[2];

  if (!(propertyName in propertyOwner)) {
    warn('No support for ' + name);
  } else {
    console.log('Supports ' + name + '!');
    return true;
  }
}

function isInIframe() {
  return window.parent !== window;
}

$(function () {
  console.log('Ready!');
});

function getPositionOptions() {
  var positionOptions = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0 };
  return positionOptions;
}

var zoomNum = 14;

function getStaticMapImage(coords, zoomLevel) {
  var latitude = coords.latitude;
  var longitude = coords.longitude;

  return "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=" + zoomLevel + "&size=480x480&sensor=false";
}

function locate() {
  console.log('Attempting to locate...');
  navigator.geolocation.getCurrentPosition(locateSuccess, locateError, getPositionOptions());
}

function locateSuccess(position) {
  console.log('successfully located you!');

  if (!startCoords) {
    startCoords = position.coords;
  }
  currentCoords = position.coords;

  $('#location').show();
  $('#zoom-in').show();
  $('#zoom-out').show();

  $('#static-map-image').attr('src', getStaticMapImage(position.coords, zoomNum));
}

function locateError(error) {
  console.log('Error locating you: ' + error);

  $('#location-error').show();
  $('#location-error').text('Error locating: ' + error);
}

var startCoords = undefined;
var currentCoords = undefined;

$(function () {
  $('#zoom-in').click(zoomIn);
  $('#zoom-out').click(zoomOut);
});

function zoomIn() {
  if (zoomNum > -1 && zoomNum < 22) {
    $('#location').show();
    $('#cam').hide();
    $('#space').hide();
    zoomNum += 2;
    console.log('Zoom: ' + zoomNum);
    $('#static-map-image').attr('src', getStaticMapImage(currentCoords, zoomNum));
  } else if (zoomNum == 22) {
    console.log('Zoom: You view');
    $('#location').hide();
    $('#cam').show();
    $('#space').hide();
    zoomNum += 2;
  }
}

function zoomOut() {
  if (zoomNum > 2 && zoomNum < 25) {
    $('#location').show();
    $('#cam').hide();
    $('#space').hide();
    zoomNum -= 2;
    console.log('Zoom: ' + zoomNum);
    $('#static-map-image').attr('src', getStaticMapImage(currentCoords, zoomNum));
  } else if (zoomNum == 2) {
    console.log('Zoom: Space view');
    $('#location').hide();
    $('#cam').hide();
    $('#space').show();
    zoomNum -= 2;
  }
}