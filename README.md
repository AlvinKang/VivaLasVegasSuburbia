# VivaLasVegasSuburbia
This is a project submission for Udacity's Full Stack Nanodegree program. This is a single-page web application implemented via Bootstrap and Knockout JS, an MVVM JavaScript framework. It also uses the Google Maps Javascript API and Foursquare API via AJAX requests. By using the Google Maps Javascript API, this app shows the map of the west suburbs of Las Vegas, where I grew up. The user can click on one of the displayed markers to view extra information provided by the Foursquare API.

## Getting Started

### Running the app
Here are the steps to follow to get the app up and running:
1. Download the contents in this repository as a ZIP and unzip into your directory.
2. Open ```index.html``` to view the web application on your browser.

Alternatively, you can view the website [here](https://alvinkang.github.io/VivaLasVegasSuburbia/), via GitHub Pages.

## Using the app
Upon opening the page, the user will be presented with a map with multiple red markers representing different locations of interest in the west suburbs of Las Vegas. When a user clicks on a marker, an infowindow will pop up and display the venue's name, image, Foursquare rating (out of 10), and address. To view additional information, the user can click on the venue's name, which is a link to its Foursquare page.

### The sidebar
A menu icon is located on the top-left corner of the map. Clicking it will open the sidebar that shows the name of the application and a dropdown menu of different categories. Other than the default "All Locations" option, the user can view a specific category of venues by choosing one of the categories. This will update the list of venues and only display markers of that chosen category.

## Acknowledgments
In order to complete the project, I referred to the [Google Maps Javascript API docs](https://developers.google.com/maps/documentation/javascript/reference/3.exp/), [Foursquare API docs](https://developer.foursquare.com/docs/api/endpoints), [Knockout JS docs](http://knockoutjs.com/documentation/introduction.html), and [Bootstrap Docs](https://getbootstrap.com/docs/4.0/getting-started/introduction/). I did not view any past submissions to complete this project.