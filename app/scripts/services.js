angular.module('app.services', ['ngResource'])
	.factory('TimeOutVenues'), function($resource) {

		return $resource('https://qa13.d:9443/v1/sites/london/search'), {})
	})
	  .value('version', '0.1');