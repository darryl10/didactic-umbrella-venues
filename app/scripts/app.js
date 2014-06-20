'use strict';

angular
  .module('ugcVizApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'serviceModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'  
      })
      .when('/venue', {
        templateUrl: 'templates/venue.html',
        controller: 'VenueCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


var serviceModule = angular.module("serviceModule", ["ngResource"]);

serviceModule.factory('apiService', function($http) {

  function getVenuesFromLocation(location) {
     var venues = $http({
        method : 'GET',
        url: 'http://qa13.d:9090/public/v1/sites/'+location+'/search',
        params: {
          what: 'canned-restaurants',
          page_size: 100
        }
     }).then(function(response){
        return response.data;
     })
     return venues;
    }

    return {
      venues: function(location) {
        return getVenuesFromLocation(location);
      },
      friends: function() {
        return ['friend1', 'friend2', 'friend3']
      }
    }

});
