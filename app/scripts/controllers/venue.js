'use strict';

angular.module('ugcVizApp')
  .controller('VenueCtrl', function ($scope, apiService) {
  		$scope.venues = apiService.venues('london');
  		$scope.friends = apiService.friends();
  });