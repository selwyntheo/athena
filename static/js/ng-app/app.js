
;(function() {


// Declare app level module which depends on views, and components
angular.module('openFinApp', [
  'ngRoute','ngSanitize'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider' 
  ,function($routeProvider,$locationProvider, $httpProvider, $compileProvider) {
  
  $locationProvider.html5Mode(false);

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

