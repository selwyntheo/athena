;(function() {
	angular
		.module('openFinApp')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ["$scope",  "$timeout",  "$location", "$rootScope", "$http"];

	function LoginCtrl($scope,  $timeout, $location,$rootScope, $http) {
		$scope.user = { rememberMe: true };

       $scope.submit = function() {
            $http({
                method: 'POST',
                url: '/loginpost',
                data: $.param({username: $scope.user.login, password: $scope.user.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
       }

       $scope.isInvalid = $location.search().status && $location.search().status === "invalid";
	}

})();