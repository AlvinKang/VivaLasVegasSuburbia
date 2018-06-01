// Global variables
let map;
let activeMarker;
let infowindow;
let markersCategorized = {};
let allMarkers = [];

// Foursquare API app credentials
const CLIENT_ID = "RXL2ZGNDMGNV4RANFA5USPSLC040X0ZHDL2YZXKFFEHCKCGT";
const CLIENT_SECRET = "KJWNND1CVUF0GFDTANR1KSLEQRRFLH034GTRJSM1J1PXT5R3";
const API_VERSION = "20180101";

// Define and sort places
let places = [
  {
    category: "Restaurants",
    title: "BRIO Tuscan Grille",
    location: { lat: 36.1670208, lng: -115.2877114 }
  },
  {
    category: "Restaurants",
    title: "Mint Indian Bistro",
    location: { lat: 36.11271519999999, lng: -115.2781838 }
  },
  {
    category: "Restaurants",
    title: "Market Grille Cafe",
    location: { lat: 36.195266, lng: -115.2481396 }
  },
  {
    category: "Restaurants",
    title: "Lee's Korean BBQ Woonamjung",
    location: { lat: 36.1269027, lng: -115.2411278 }
  },

  {
    category: "Parks",
    title: "Mesa Park",
    location: { lat: 36.0898885, lng: -115.327354 }
  },
  {
    category: "Parks",
    title: "Desert Breeze Park",
    location: { lat: 36.1247021, lng: -115.2743979 }
  },
  {
    category: "Parks",
    title: "Angel Park",
    location: { lat: 36.1705481, lng: -115.2794986 }
  },
  {
    category: "Parks",
    title: "Lorenzi Park",
    location: { lat: 36.1794844, lng: -115.1873993 }
  },

  {
    category: "Movie Theaters",
    title: "AMC Rainbow Promenade 10",
    location: { lat: 36.2026616, lng: -115.2436227 }
  },
  {
    category: "Movie Theaters",
    title: "Regal Cinemas Red Rock 16 & IMAX",
    location: { lat: 36.154651, lng: -115.334887 }
  },
  {
    category: "Movie Theaters",
    title: "Cinemark Century 16 Movie Theater",
    location: { lat: 36.1691498, lng: -115.2918826 }
  },
  {
    category: "Movie Theaters",
    title: "Regal Cinemas Village Square 18",
    location: { lat: 36.147239, lng: -115.300483 }
  },
  {
    category: "Movie Theaters",
    title: "Brenden Theater",
    location: { lat: 36.1141321, lng: -115.1960775 }
  },

  {
    category: "Libraries",
    title: "Sahara West Library",
    location: { lat: 36.1450039, lng: -115.3054274 }
  },
  {
    category: "Libraries",
    title: "Spring Valley Library",
    location: { lat: 36.111408, lng: -115.224237 }
  },
  {
    category: "Libraries",
    title: "West Charleston Public Library",
    location: { lat: 36.1582708, lng: -115.2311566 }
  },
  {
    category: "Libraries",
    title: "Summerlin Library",
    location: { lat: 36.191391, lng: -115.301739 }
  }
];

// Comparison function to properly sort places by title
function comparePlaces(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

places.sort(comparePlaces);

// Google Maps API functions
function initMap() {
  // Map styling
  let styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e"
        }
      ]
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70"
        }
      ]
    }
  ];

  // Contstruct a map centered and zoomed
  let mapCenter = { lat: 36.1550321, lng: -115.328478 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: mapCenter,
    styles: styles,
    scrollwheel: false,
    mapTypeControl: false,
    gestureHandling: "greedy"
  });

  let largeInfowindow = new google.maps.InfoWindow({
    maxWidth: 150
  });
  infowindow = largeInfowindow;
  let bounds = new google.maps.LatLngBounds();

  // Loop through all the places and make markers for each place
  for (let i = 0; i < places.length; i++) {
    let place = places[i];
    let marker = new google.maps.Marker({
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
    marker.addListener("click", () => {
      populateInfoWindow(this, largeInfowindow);
      animateMarker(this);
      map.panTo(marker.position);
    });

    // Extend map boundaries to fit marker
    bounds.extend(marker.position);
  }

  // Reposition map to capture all markers
  map.fitBounds(bounds);
}

// Helper function to fill in infowindow for given marker
function populateInfoWindow(marker, infowindow) {
  // As long as there's no infowindow already there, populate it
  if (infowindow.marker !== marker) {
    infowindow.setContent("");
    infowindow.marker = marker;

    // When infowindow is closed, clear marker property, stop bouncing animation
    infowindow.addListener("closeclick", () => {
      infowindow.marker = null;
      marker.setAnimation(null);
      activeMarker = null;
    });

    // HTML that will populate the infowindow
    let windowContent = "";

    // Perform search for that venue using marker's title and location
    let searchUrl = "https://api.foursquare.com/v2/venues/search";
    let latlng =
      "" + marker.getPosition().lat() + "," + marker.getPosition().lng();
    searchUrl +=
      "?" +
      $.param({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: API_VERSION,
        ll: latlng,
        query: marker.title,
        radius: "5000"
      });

    $.getJSON(searchUrl, result => {
      // Retrieve place ID and perform another venue details AJAX request
      let venue = result["response"]["venues"][0];
      let venueID = venue["id"];
      let detailsUrl = "https://api.foursquare.com/v2/venues/";
      detailsUrl +=
        venueID +
        "?" +
        $.param({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          v: API_VERSION
        });
      $.getJSON(detailsUrl, data => {
        let venue = data["response"]["venue"];

        // Venue Foursquare page
        let venueFoursquarePageURL = venue["canonicalUrl"];
        windowContent += `<h6><a href="${venueFoursquarePageURL}" target="_blank">${
          marker.title
        }</a></h6>`;

        // Venue photo
        let photoURL = "";

        if (venue["photos"]["count"] > 0) {
          let firstPic = venue["photos"]["groups"][0]["items"][0];
          let prefix = firstPic["prefix"];
          let suffix = firstPic["suffix"];
          photoURL += prefix + "100x100" + suffix;
        }
        if (photoURL.length !== 0) {
          let venueImage = `<img src="${photoURL}" style="border-radius: 8px">`;
          windowContent += venueImage + "<br><br>";
        }

        // Venue rating
        if (venue["rating"]) {
          let rating = venue["rating"];
          let ratingColor = venue["ratingColor"];
          windowContent += `<b>Foursquare Rating: <span style="color:#${ratingColor}; font-size: 1.5em">${rating}</span></b><br><br>`;
        }

        // Venue address
        let venueAddress =
          venue["location"]["address"] +
          "<br>" +
          venue["location"]["formattedAddress"][1];
        windowContent += venueAddress;

        // Attach content to infowindow
        setWindowContent(infowindow, windowContent);
      }).fail(() => {
        // If the AJAX request fails, change window information
        windowContent = "Cannot retrieve information about this venue.";
        setWindowContent(infowindow, windowContent);
      });
    }).fail(() => {
      // AJAX fail message same as above
      windowContent = "Cannot retrieve information about this venue.";
      setWindowContent(infowindow, windowContent);
    });

    // Open the infowindow at the marker
    infowindow.open(map, marker);
  }
}

// Helper function to set given content to infowindow
function setWindowContent(infowindow, windowContent) {
  infowindow.setContent("<div>" + windowContent + "<div>");
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
  for (let category in markersCategorized) {
    for (let i = 0; i < markersCategorized[category].length; i++) {
      let marker = markersCategorized[category][i];
      marker.setMap(null);
    }
  }
}

// Show all markers
function showAllMarkers() {
  for (let category in markersCategorized) {
    showCategoryMarkers(category);
  }
}

// Show only markers of given category
function showCategoryMarkers(category) {
  for (let i = 0; i < markersCategorized[category].length; i++) {
    let marker = markersCategorized[category][i];
    marker.setMap(map);
  }
}

// Call when there is a problem with Google Maps API
function gm_authFailure() {
  alert("Google Maps cannot be loaded.");
}

// ViewModel is also referred to as $root
let ViewModel = () => {
  initMap();
  let self = this;

  // Holds locations markers organized by category
  self.locationsCategorized = ko.observableArray();
  // Add category that contains all markers
  self.locationsCategorized().push({
    locationsType: "All Locations",
    markers: allMarkers
  });

  // Create new category entry for each category of markers
  for (let category in markersCategorized) {
    let categoryEntry = {
      locationsType: category,
      markers: markersCategorized[category]
    };
    self.locationsCategorized().push(categoryEntry);
  }

  // Local variable to store selected option from dropdown
  self.currentLocations = ko.observable();

  // When user interacts with dropdown, display the markers for the corresponding location type
  self.currentLocations.subscribe(currentLocations => {
    if (currentLocations.locationsType === "All Locations") {
      showAllMarkers();
    } else {
      hideAllMarkers();
      showCategoryMarkers(currentLocations.locationsType);
    }
  });

  // When a list item is clicked, animate the marker and show clicked location's infowindow
  self.triggerLocationInfo = place => {
    // Locate marker by title of location
    let matchedMarker = self.currentLocations().markers.find(marker => {
      return marker.title === place.title;
    });
    animateMarker(matchedMarker);
    populateInfoWindow(matchedMarker, infowindow);
  };
};

ko.applyBindings(new ViewModel());
