'use strict';

angular.module('ugcVizApp')
  .controller('VenueCtrl', function ($scope, apiService) {

  	var location = prompt('please enter your location').toLowerCase();

 // var onMarkerClicked = function(marker) {
 //      $scope.$apply(function() {
 //        marker.showWindow = !marker.showWindow;
 //      });
 //    }

 //    $scope.map = {
 //      center: {
 //        latitude: 51.5,
 //        longitude: -0.1
 //      },
 //      zoom: 8,
 //      markers: []


 //    };

 //    $scope.areaLong = 51.2;
 //    $scope.areaLat = -0.8;
 //    var marker1 = {
 //      id: "id",
 //      latitude: $scope.areaLong,
 //      longitude: $scope.areaLat,
 //      showWindow: false,
 //      template: "venue-info.html",
 //      tp: '',
 //      closeClick: function() {
 //        console.log("closeClick");
 //      },
 //      openClick: function() {
 //        //alert("ddd")
 //        console.log("onClicked");
 //        onMarkerClicked(marker1);
 //      }
 //    }

 //    $scope.map.markers.push(marker1);


 apiService.venues(location).then(function(data){
  $scope.venues = data.body;
  console.log($scope.venues);  		
        // for (var i = 0; i < $scope.venues.length; i++) {
        //   console.log($scope.venues[i]);
        //   var venueObjects = $scope.venues[i].name;
          // console.log(venueObjects);

          var infowindow = null;
          function initialize() {
            var centerMap = new google.maps.LatLng(51, -0.1);

            var myOptions = {
              zoom: 10,
              center: centerMap,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            setZoom(map, $scope.venues);
            setMarkers(map, $scope.venues); 
            infowindow = new google.maps.InfoWindow({
              content: "Loading..."
            });
          }

/*
This functions sets the markers (array)
*/
function setMarkers(map, markers) {
  for (var i = 0; i < markers.length; i++) {
    var site = markers[i];
    var siteLatLng = new google.maps.LatLng(site.latitude, site.longitude);
    var marker = new google.maps.Marker({
      position: siteLatLng,
      map: map,
      title: site.name,
      zIndex: 2,
      html: site.category_representation,
// Markers drop on the map
animation: google.maps.Animation.DROP
});
    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });
  }
 
/*
Set the zoom to fit comfortably all the markers in the map
*/
function setZoom(map, markers) {
var boundbox = new google.maps.LatLngBounds();
for ( var i = 0; i < markers.length; i++ )
{
boundbox.extend(new google.maps.LatLng(markers[i].latitude, markers[i].longitude));
}
map.setCenter(boundbox.getCenter());
map.fitBounds(boundbox);
}





        }	 

  		}, function(error, message) {
			alert('There was an error ' + message)
  		})


// var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 12,
//       // center: new google.maps.LatLng(-33.92, 151.25),
//       center: new google.maps.LatLng(36.8857, -76.2599),
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     });

//     var infowindow = new google.maps.InfoWindow();

//     var marker, i;

//     for (i = 0; i < venueObjects.length; i++) {  
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng(venueObjects[i][1], venueObjects[i][2]),
//         map: map
//       });

//       google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         return function() {
//           infowindow.setContent(venueObjects[i][0], venueObjects[i][6]);
//           infowindow.open(map, marker);
//         }
//       })(marker, i));
//     }


      // var markersContent = function(venues) {
      //   var markertemplates = {
      //     id: "id",
      //     latitude: data.body.latitude,
      //     longitude: data.body.longitude,
      //     showWindow: false,
      //     template: "venue-info.html",
      //     tp: '',
      //     closeClick: function() {
      //       console.log("closeClick");
      //     },
      //     openClick: function() {
      //   //alert("ddd")
      //   console.log("onClicked");
      //   onMarkerClicked(venues);
      // }

      // })

      // $scope.map.markers.push(markersContent($scope.venues));

      // for (var i = 0; i < data.body.length; i++) {

      //   console.log(i);

      // }

  		$scope.friends = apiService.friends();
      
  });