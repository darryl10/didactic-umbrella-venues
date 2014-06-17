var r = $resource(url, [defaultParameters], [customActions]);




var r = $resource(

	'https://qa13.d:9443/v1/sites/london/search',
	?,
	{ Venues: 
		{ method: 'GET', 
		  params: {
     		what: 'canned-restaurants',
          	page_size: 100
			},
		  isArray: true
	}}
	  );


console.info(r);

/*
 - url: parameterized url template. 
   Parameters are prefixed by ":"; for example /book/:bookId
 - defaultParameters: it is an object containing default values 
    for url's parameter; for example { bookId: 42 }
 - customActions: it allows to extend the resource object with 
   custom actions; for example:

   {actionName: { method: '', params: {}, isArray: true/false }}

   - method: HTTP request method; one of (GET, POST, PUT, DELETE)
   - params: additional parameters.
   - isArray: true if the returned object for this action is an 
     array.
*/

var r = $resource



var service = angular.module("apiService", ["ngResource"]);

service.factory('Venues', function ['$resource', function($resource) {
    return $resource(

	'https://qa13.d:9443/v1/sites/london/search',
	{ Id: "@Id" },
	{ Venues: 
		{ method: 'GET', 
		  params: {
     		what: 'canned-restaurants',
          	page_size: 100
			},
		  isArray: true
	}}
	  );

    });

    var venues = Venues.query();