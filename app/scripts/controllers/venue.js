'use strict';

angular.module('ugcVizApp')
.controller('VenueCtrl', function ($scope, apiService) {

  var location = prompt('please enter your location').toLowerCase();

  if (location ==="new york".toLowerCase()) {

    location = "newyork";

  } else {

    location = location;

  }

  var geocoder = new google.maps.Geocoder();
  var lat, long, map;
  var exampleInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum neque vel rutrum porta. Vivamus dictum massa vel est mollis tincidunt. Suspendisse quis commodo mi. Proin fringilla mauris eu lorem mollis placerat. Aliquam erat volutpat. Mauris consectetur diam vitae tellus dignissim, sit amet euismod lorem pretium. Sed egestas libero ut nisl eleifend, eget sollicitudin nulla suscipit. Nullam vitae accumsan dui. Nullam consectetur ullamcorper tellus. Nunc et felis sed leo iaculis convallis ac vel libero. Pellentesque non mi placerat, pretium velit molestie, ultricies felis. Fusce non commodo enim. Sed consequat fermentum erat, vitae vehicula velit sodales ut. Vestibulum et blandit mauris.';

  apiService.venues(location).then(function(data) {
    $scope.venues = data.body;
    console.log($scope.venues);
    getCityCoords();
  });

  var getCityCoords = function() {

   geocoder.geocode({'address':location}, function(results, status) {
    console.log(status, google.maps.GeocoderStatus.OK)
    if (status === google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      long = results[0].geometry.location.lng();
      createMap(lat,long)
    } 
  }); 

 }

 var createMap = function(lat,long) {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(lat, long),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  setVenueMarkers();

};

var setVenueMarkers = function() {

  var infowindow = new google.maps.InfoWindow();
  var marker;

  for (var i = 0; i < $scope.venues.length; i++) {  

    marker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.venues[i].latitude, $scope.venues[i].longitude),
      icon: "../../images/to-marker1.png", 
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent('<div class="venue-container">' + '<div class="iw-container">' + '<div class="pull-left iw-info">' +'<h1>' + $scope.venues[i].name + '</h1>' 
          +'<h3>' + $scope.venues[i].location + '</h3>'
          + '<p><strong>Category: </strong>' + $scope.venues[i].category_representation + '</p>'
          + '<p><strong>Rating: </strong>' + $scope.venues[i].editorial_rating +' out of 5' + 
          '</p>'+ '<p>' + exampleInfo + '</p>' + '</div>' + '<div class="pull-right iw-image">' 
          + '<img class="img-responsive" src=' + $scope.venues[i].image_url + '>' + '</div>' +'</div>' + '<div class="clearfix">' + '</div>' + '<div class="clearfix">' + '</div>' + '</div>');

        infowindow.open(map, marker);
      }
    })(marker, i));


  }
}

});