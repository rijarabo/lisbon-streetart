

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(window).on('load',function(){
    $('#StartModalLong').modal('show');
});


var centerMap =[38.727505,-9.153328];
var zoomMap= 13;

var map = L.map('my-map').setView(centerMap, zoomMap);

// map //

// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

//https://docs.google.com/spreadsheets/d/1fQyh67lI0pY2fs1ZrvxZPn76Knv74hF_FYlU8lL0Ap4/edit#gid=0

// var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	subdomains: 'abcd',
// 	minZoom: 0,
// 	maxZoom: 20,
// 	ext: 'png'
// }).addTo(map);

// **********************************
//                MAP              //
// **********************************

// Tutorial to add google layers and style:
// https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant
// style google map:
// https://developers.google.com/maps/documentation/javascript/styling
// https://mapstyle.withgoogle.com/

var googlestyle = L.gridLayer.googleMutant({
    type: 'roadmap',
    styles:
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#424242"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#424242"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#8efa00"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fffb00"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fffb00"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fffb00"
          },
          {
            "weight": 1.5
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fffb00"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#7a81ff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0433ff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#424242"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0096ff"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
}).addTo(map);

getPlaces((places) => {

  places.forEach((place) => {

    const latLon = [place.lat, place.lon];

    const circleOptions = {
      stroke: "TOMATO",
      radius: 10,
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
