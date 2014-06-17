'use strict';
//TODO qa10.d:9090/internal/v1/analytics/tags

angular.module('ugcVizApp')
  .controller('TestCtrl', function ($scope, $location, $timeout) {

        var User = function (name, age) {

	        console.log(name);
	        var location = prompt("Please enter your location.","Timbuktu.");
 			var accessLocation = location.toUpperCase();
	        var legalAge = age * 2.8;

			var gapinages = legalAge - age;
     		var countdown = Math.ceil(gapinages);
     		console.log(countdown);

        if (legalAge < 100) {

            alert("Sorry. you are too young for these attractions.");
          
           var nla = function(){
            	alert("There are" + " " + countdown + " " + "years until you'll be old enough to see our grand plan. Happy waiting!");
            };

            nla();

        } else if (accessLocation !="LONDON") {

          alert("Sorry, this service only works in the Greater London area.");

        } else {

          alert("Come on in!");

        }

          return {
          	name: name,
          	location: location,
          	age: age,
          	legalAge: legalAge,
          	countdown: countdown
          }


      }

      $scope.user = new User("Darryl", 17);

      $timeout(function(){
      	$scope.user.location = prompt('enter another location')
      }, 5000)

	


  });
