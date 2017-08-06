var initialize = function(){
  var url = 'http://api.worldbank.org/v2/countries?format=json';
  makeRequest(url, requestComplete);

  var mapDiv = document.querySelector('#main-map');
  var center = { lat: 38.8993276, lng: -77.0847778 };
  var mainMap = new MapWrapper(mapDiv, center, 10);
  mainMap.addInfoWindow(center, 'HEADQUARTERS <br>  <b>THE WORLD BANK<b>');
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();

  request.addEventListener('load', callback);

  request.open('GET', url, true);
  request.send();
}

var requestComplete = function () {
  if (this.status !== 200) return; 
 var jsonString = this.responseText;
 var response = JSON.parse(jsonString);
 // first element of response = metadata re. response
 // countries = an array of country objects
 var countries = response[1];
 populateDropDown(countries);
}

var populateDropDown = function(countries) {
  var select = document.querySelector("#drop-down");
  select.innerHTML = '';

  countries.forEach(function(country){
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option)
  });
}

window.addEventListener('load', initialize);
