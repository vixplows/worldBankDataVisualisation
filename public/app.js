var initialize = function(){
  var url = 'http://api.worldbank.org/v2/countries?format=json&per_page=400';
  makeRequest(url, function () {
    if (this.status !== 200) return; 
    var jsonString = this.responseText;
    var response = JSON.parse(jsonString);
   // countries is an array of country objects; the first element in response not needed as metadata
   var countries = response[1];
   populateDropDown(countries);
 });

  var mapDiv = document.querySelector('#main-map');
  navigator.geolocation.getCurrentPosition(function(position) {
    var center = {lat: position.coords.latitude, lng: position.coords.longitude}; 
    var mainMap = new MapWrapper(mapDiv, center, 10);
  });
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', callback);
  request.open('GET', url, true);
  request.send();
}

var populateDropDown = function(countries) {
  var countryList = [];
  var select = document.querySelector("#drop-down");

  countries.forEach(function(country){
    // to remove regions and leave only countries in list
    if (/^[a-zA-Z]+$/.test(country.iso2Code)) {
      countryList.push(country);
    }
  });

  countryList.sort(function(a,b) {
    if ( a.name < b.name )
      return -1;
    if ( a.name > b.name )
      return 1;
    return 0;
  });

  countryList.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    option.value = country.id;
    select.appendChild(option)
  });

  var dropDown = document.querySelector('#drop-down')

  dropDown.onchange = function() {
    var url = 'http://api.worldbank.org/v2/countries/' + this.value +'?format=json';
    makeRequest(url, function(){
     if (this.status !== 200) return; 
     var jsonString = this.responseText;
     var response = JSON.parse(jsonString);
     var country = response[1][0];
     // console.log(country);

     var mapDiv = document.querySelector('#main-map');
     var position = { lat: parseFloat(country.latitude), lng: parseFloat(country.longitude) };
     var mainMap = new MapWrapper(mapDiv, position, 10);
     mainMap.addInfoWindow(position, 'Country: ' +
      country.name + '<br> Capital city: ' + country.capitalCity + '<br>' + 'Income level: ' + country.incomeLevel.value);

     new LineChart(country);
     // console.log(country);

   });
  };
}

window.addEventListener('load', initialize);
