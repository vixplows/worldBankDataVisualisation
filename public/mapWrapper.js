var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    return marker;
  },

  addInfoWindow: function(coords, text) {
    var marker = this.addMarker(coords);
    marker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content: text
      });
      infoWindow.open(this.map, marker); 
    });
  },

}