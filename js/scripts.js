var centerMap =[38.727505,-9.153328];
var zoomMap= 13;

var map = L.map('my-map').setView(centerMap, zoomMap);

// map //

// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

//https://docs.google.com/spreadsheets/d/1fQyh67lI0pY2fs1ZrvxZPn76Knv74hF_FYlU8lL0Ap4/edit#gid=0

var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

getPlaces((places) => {

  places.forEach((place) => {

    const latLon = [place.lat, place.lon];

    const circleOptions = {
      stroke: false,
      radius: 5,
      fillOpacity: 0.8,
      fillColor: "DEEPPINK",
      width: 0
    }

    L.circleMarker(latLon, circleOptions).addTo(map)
        .bindPopup
        ('<b>' + place.name  + ' (' + place.year+') '+ '</b><br>' +
         'Artist: ' + place.artist + '</b><br>' +
         'Location: ' + place.add + '</b><br>' +
         place.pics );
  });
});


function getPlaces(callback) {
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrbNan2uq_0gaxHGHpJ8T1kA-Tb7rD5T8e7H-bIELsEPIISevMFQT-hboXsXyIzj6Nmf6uFUTi8IlY/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
