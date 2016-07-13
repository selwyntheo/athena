;(function() {
	angular
		.module('openFinApp')
		.controller('SignupCtrl', SignupCtrl);

	SignupCtrl.$inject = ["$scope",  "$timeout",  "$location", "$rootScope", "$http"];

	function SignupCtrl($scope,  $timeout, $location,$rootScope, $http) {
		$scope.user = { rememberMe: true };

       $scope.submit = function() {
            $http({
                method: 'POST',
                url: '/signup',
                data: $.param({username: $scope.user.login, password: $scope.user.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
       }

       $scope.isInvalid = $location.search().status && $location.search().status === "invalid";
	}

})();