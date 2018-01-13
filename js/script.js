console.log("hey it's working!");

function initMap() {
	var lasVegas = {lat: 36.1550321, lng: -115.328478};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: lasVegas
	});
	var marker = new google.maps.Marker({
		position: lasVegas,
		map: map
	});
}