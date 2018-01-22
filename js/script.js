// Global variables
var map;
var markers = [];

function initMap() {
  // Map styling
  var styles = [
  	{
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#255763"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }
  ];

  // Contstruct a map centered and zoomed
  var mapCenter = { lat: 36.1550321, lng: -115.328478 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: mapCenter,
    styles: styles,
    scrollwheel: false
  });

  // Filler locations (for starters); place ID commented at the end of each location
  var locations = [
    { title: "Mint Indian Bistro", location: { lat: 36.11271519999999, lng: -115.2781838 } }, // ChIJD7km0lbHyIARxWA29WeiUVU
    { title: "EATT Gourmet Bistro", location: { lat: 36.1432982, lng: -115.2621864 } }, // ChIJtYxg2r_AyIARx2k0A8204nc
    { title: "Market Grille Cafe", location: { lat: 36.195266, lng: -115.2481396 } }, // ChIJTSVGfzDAyIARQlUdDlgAOcA
    { title: "Courtyard by Marriott Las Vegas Summerlin", location: { lat: 36.1927815, lng: -115.2427308 } }, // ChIJOdTzvDbAyIARq46IOHOw8V8
    { title: "Lee's Korean BBQ Woonamjung", location: { lat: 36.1269027, lng: -115.2411278 } }, // ChIJCcO8bCvHyIARgbq2HoGdsHI
  ];

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Loop through locations array and push markers into markers array
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;

    // Create a marker for each location
    var marker = new google.maps.Marker({
      map: map,
      title: title,
      position: position,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Push marker to array
    markers.push(marker);

    // When user clicks on marker, show info window
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    // Extend map boundaries to fit marker
    bounds.extend(markers[i].position);
  }
  // Reposition map to capture all markers
  map.fitBounds(bounds);
}

// Helper function to fill in infowindow for given marker
function populateInfoWindow(marker, infowindow) {
  // As long as there's no infowindow already there, populate it
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // Name of location for now; implement other information using FourSquare API in the future
    infowindow.setContent('<div>' + marker.title + '<div>');

    // Open the infowindow at the marker
    infowindow.open(map, marker);

    // When infowindow is closed, clear marker property
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }
}