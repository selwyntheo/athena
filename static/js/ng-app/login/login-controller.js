;(function() {
	angular
		.module('openFinApp')
		.controller('LoginCtrl', function($scope, $auth) {

	    $scope.authenticate = function(provider) {
	      $auth.authenticate(provider);
	    };

  	});

})();