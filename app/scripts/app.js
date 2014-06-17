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

serviceModule.factory('apiService', function($resource) {

  function getVenuesFromLocation(location) {
      if(location === 'london') {
        return ['london1', 'london2', 'london3'] 
      } else {
         return ['venue1', 'Venue2', 'Venue3'] 
      }
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


  // 'https://qa13.d:9443/v1/sites/london/search', { 
  //   Id: "@Id" }, 
  //   { Venues: 
  //   { method: 'GET', 
  //   params: {
  //     what: 'canned-restaurants',
  //     page_size: 100
  //   },
  //   isArray: true
  // }}
  // );
