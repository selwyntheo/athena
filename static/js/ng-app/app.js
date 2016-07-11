
;(function() {


// Declare app level module which depends on views, and components
angular.module('openFinApp', [
  'ngRoute','ngSanitize','satellizer'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider','$authProvider'
  ,function($routeProvider,$locationProvider, $httpProvider, $compileProvider,$authProvider) {
  
  $locationProvider.html5Mode(false);

  $authProvider.google({
      clientId: '864905426498-s6vbp2kerartm30b9bsl2u966mrn3dv2.apps.googleusercontent.com'
    });

  $routeProvider
  .when('/dashboard', {
  	templateUrl: 'views/dashboard.html',
  	controller:'DashboardCtrl',
  	controllerAs: 'dashboardCtrl'
  })
  .when('/quiz', {
    templateUrl: 'views/quiz.html',
    controller: 'QuizCtrl',
    controllerAs: 'quizCtrl'
  })
  .when('/sign-in', {
    templateUrl: 'views/sign-in.html',
    controller: 'LoginCtrl',
    controllerAs: 'loginCtrl'
  })
  .otherwise({
  	redirectTo:'/'
  });


}]);

angular
	.module('openFinApp')
	.constant('CONSTANTS',{
		'API_URL': 'http://127.0.0.1:9011'
	});

angular
	.module('openFinApp')
	.run(run);

run.$inject = ['$rootScope', '$location'];

function run($rootScope, $location) {
	console.log('Application Initialized');
}

})();


