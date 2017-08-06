var initialize = function(){
  var mapDiv = document.querySelector('#main-map');

  var center = { lat: 38.8993276, lng: -77.0847778 };

  var mainMap = new MapWrapper(mapDiv, center, 10);

  mainMap.addInfoWindow(center, "HEADQUARTERS <br> THE WORLD BANK <b>");
}

window.addEventListener('load', initialize)
