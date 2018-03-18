// Global variables
var map;
var activeMarker;
var infowindow;
var markersCategorized = {};
var allMarkers = [];

// Foursquare API app credentials
const CLIENT_ID = "RXL2ZGNDMGNV4RANFA5USPSLC040X0ZHDL2YZXKFFEHCKCGT";
const CLIENT_SECRET = "KJWNND1CVUF0GFDTANR1KSLEQRRFLH034GTRJSM1J1PXT5R3";
const API_VERSION = "20180101";

// Hard-coded locations for now, but dynamically present them through Google places API later
// Categories: restaurants, parks, movie theaters, libraries
var places = [
	{ category: "Restaurants", title: "BRIO Tuscan Grille", location: { lat: 36.1670208, lng: -115.2877114 } },
	{ category: "Restaurants", title: "Mint Indian Bistro", location: { lat: 36.11271519999999, lng: -115.2781838 } },
	{ category: "Restaurants", title: "Market Grille Cafe", location: { lat: 36.195266, lng: -115.2481396 } },
	{ category: "Restaurants", title: "Lee's Korean BBQ Woonamjung", location: { lat: 36.1269027, lng: -115.2411278 } },
	{ category: "Restaurants", title: "Crave American Kitchen & Sushi Bar", location: { lat: 36.151, lng: -115.332771 } },

	{ category: "Parks", title: "Mesa Park", location: { lat: 36.0898885, lng: -115.327354 } },
	{ category: "Parks", title: "Desert Breeze Park", location: { lat: 36.1247021, lng: -115.2743979 } },
	{ category: "Parks", title: "Angel Park", location: { lat: 36.1705481, lng: -115.2794986 } },
	{ category: "Parks", title: "Lorenzi Park", location: { lat: 36.1794844, lng: -115.1873993 } },

	{ category: "Movie Theaters", title: "AMC Rainbow Promenade 10", location: { lat: 36.2026616, lng: -115.2436227 } },
	{ category: "Movie Theaters", title: "Regal Cinemas Red Rock 16 & IMAX", location: { lat: 36.154651, lng: -115.334887 } },
	{ category: "Movie Theaters", title: "Cinemark Century 16 Movie Theater", location: { lat: 36.1691498, lng: -115.2918826 } },
	{ category: "Movie Theaters", title: "Regal Cinemas Village Square 18", location: { lat: 36.147239, lng: -115.300483 } },
	{ category: "Movie Theaters", title: "Brenden Theater", location: { lat: 36.1141321, lng: -115.1960775 } },

	{ category: "Libraries", title: "Sahara West Library", location: { lat: 36.1450039, lng: -115.3054274 } },
	{ category: "Libraries", title: "Spring Valley Library", location: { lat: 36.111408, lng: -115.224237 } },
	{ category: "Libraries", title: "West Charleston Public Library", location: { lat: 36.1582708, lng: -115.2311566 } },
	{ category: "Libraries", title: "Summerlin Library", location: { lat: 36.191391, lng: -115.301739 } }
];

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
    scrollwheel: false,
    mapTypeControl: false
  });

  var largeInfowindow = new google.maps.InfoWindow();
  infowindow = largeInfowindow;
  var bounds = new google.maps.LatLngBounds();

  // Loop through all the places and make markers for each place
  for (var i = 0; i < places.length; i++) {
  	var place = places[i];
  	var marker = new google.maps.Marker({
  		map: map,
  		title: place.title,
  		position: place.location,
  		animation: google.maps.Animation.DROP
  	});

  	allMarkers.push(marker);

  	// Add marker to hashmap <category: [markers]>
  	// If the category doesn't exist, add new key-value pair
  	if (!(place.category in markersCategorized)) {
  		markersCategorized[place.category] = [];
  	}
		markersCategorized[place.category].push(marker);

  	// Add click events to marker
  	marker.addListener('click', function() {
  		populateInfoWindow(this, largeInfowindow);
  		animateMarker(this);
  	});

  	// Extend map boundariers to fit marker
  	bounds.extend(marker.position);
  }

  // Reposition map to capture all markers
  map.fitBounds(bounds);
}

// Helper function to fill in infowindow for given marker
function populateInfoWindow(marker, infowindow) {
  // As long as there's no infowindow already there, populate it
  if (infowindow.marker != marker) {
    infowindow.marker = marker;

    var windowContent = "<h6>" + marker.title + "</h6>";

    // 1. Perform search for that venue using marker's title and location
    var searchUrl = "https://api.foursquare.com/v2/venues/search";
    var latlng = '' + marker.getPosition().lat() + ',' + marker.getPosition().lng();
    searchUrl += '?' + $.param({
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'v': API_VERSION,
      'll': latlng,
      'query': marker.title,
      'radius': "5000"
    });

    $.getJSON(searchUrl, function(result) {
    	// 2. Retrieve place ID and perform another venue details AJAX request
      var venue = result["response"]["venues"][0];
      var venueID = venue["id"];
      var detailsUrl = "https://api.foursquare.com/v2/venues/";
      detailsUrl += venueID + '?' + $.param({
      	'client_id': CLIENT_ID,
      	'client_secret': CLIENT_SECRET,
      	'v': API_VERSION
      });
      $.getJSON(detailsUrl, function(data) {
      	var venue = data["response"]["venue"];

      	// Obtain photo URL and create image element
      	var photoURL = '';

      	if (venue["photos"]["count"] > 0) {
      		var firstPic = venue["photos"]["groups"][0]["items"][0];
      		var prefix = firstPic["prefix"];
      		var suffix = firstPic["suffix"];
      		photoURL += prefix + "100x100" + suffix;
      	}
      	if (photoURL.length !== 0) {
      		var venueImage = `<img src="${photoURL}">`;
      		windowContent += venueImage + "<br><br>";
      	}
      	var venueAddress = venue["location"]["formattedAddress"][0] + "<br>" + venue["location"]["formattedAddress"][1];
      	windowContent += venueAddress;
      	setWindowContent(infowindow, windowContent);
      }).fail(function() {
      	// If the AJAX request fails, change window information
      	windowContent = "Cannot retrieve information about this venue.";
      	setWindowContent(infowindow, windowContent);
      });

    }).fail(function() {
      // AJAX fail message same as above
      windowContent = "Cannot retrieve information about this venue.";
      setWindowContent(infowindow, windowContent);
    });

    // Open the infowindow at the marker
    infowindow.open(map, marker);

    // When infowindow is closed, clear marker property, stop bouncing animation
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      marker.setAnimation(null);
      activeMarker = null;
    });
  }
}

function setWindowContent(infowindow, windowContent) {
	infowindow.setContent('<div>' + windowContent + '<div>');
}

/* NOTE: ONLY TURNS ON CURRENT MARKER, TURN OFF IS HANDLED BY CLOSECLICK OF INFOWINDOW */
function animateMarker(marker) {
	// Turn off the other marker that is already active
	if (activeMarker && marker !== activeMarker) {
		activeMarker.setAnimation(null);
	}

	// If no animation, animate and assign to active
	if (marker.getAnimation() === null) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		activeMarker = marker;
	}
}

// Hide markers
function hideAllMarkers() {
	for (var category in markersCategorized) {
		for (var i = 0; i < markersCategorized[category].length; i++) {
			var marker = markersCategorized[category][i];
			marker.setMap(null);
		}
	}
}

// Show all markers
function showAllMarkers() {
	for (var category in markersCategorized) {
		showCategoryMarkers(category);
	}
}

// Show only markers of given category
function showCategoryMarkers(category) {
	for (var i = 0; i < markersCategorized[category].length; i++) {
		var marker = markersCategorized[category][i];
		marker.setMap(map);
	}
}


// ViewModel is also referred to as $root
var ViewModel = function() {
	initMap();
	var self = this;

	// Holds locations markers organized by category
	self.locationsCategorized = ko.observableArray();
	// Add category that contains all markers
	self.locationsCategorized().push({
		locationsType: "All Locations",
		markers: allMarkers
	});

	// Create new category entry for each category of markers
	for (var category in markersCategorized) {
		var categoryEntry = {
			locationsType: category,
			markers: markersCategorized[category]
		};
		self.locationsCategorized().push(categoryEntry);
	}

	// Local variable to store selected option from dropdown
	self.currentLocations = ko.observable();

	// When user interacts with dropdown, display the markers for the corresponding location type
	self.currentLocations.subscribe(function(currentLocations) {
		if (currentLocations.locationsType === "All Locations") {
			showAllMarkers();
		} else {
			hideAllMarkers();
			showCategoryMarkers(currentLocations.locationsType);
		}
	});

	// When a list item is clicked, animate the marker and show clicked location's infowindow
	self.triggerLocationInfo = function(place) {
		// Locate marker by title of location
		var matchedMarker = self.currentLocations().markers.find(function(marker) {
			return (marker.title === place.title);
		});
		animateMarker(matchedMarker);
		populateInfoWindow(matchedMarker, infowindow);
	}
}

ko.applyBindings( new ViewModel() );