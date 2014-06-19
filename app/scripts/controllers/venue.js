'use strict';

angular.module('ugcVizApp')
.controller('VenueCtrl', function ($scope, apiService) {

 var location = prompt('please enter your location').toLowerCase(),
 geocoder = new google.maps.Geocoder(),
 address = location,
 latitude,
 location;

 geocoder.geocode( { 'address': address}, function(results, status) {
  if (status === google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
    alert(latitude);
  } 
}); 

    // alert(latitude);

    apiService.venues(location).then(function(data) {
      $scope.venues = data.body;
      console.log($scope.venues);  		
        // for (var i = 0; i < $scope.venues.length; i++) {
        //   console.log($scope.venues[i]);
        //   var venueObjects = $scope.venues[i].name;
        //   // console.log(venueObjects);
        // }	 

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
      // center: new google.maps.LatLng(-33.92, 151.25),
      center: new google.maps.LatLng(51.5, -0.1),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < $scope.venues.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.venues[i].latitude, $scope.venues[i].longitude),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent($scope.venues[i].name);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

      }, function(error, message) {
       alert('There was an error ' + message)
     })

$scope.friends = apiService.friends();

});