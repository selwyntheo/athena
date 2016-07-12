
;(function() {


// Declare app level module which depends on views, and components
angular.module('openFinApp', [
  'ngRoute','ngSanitize','satellizer'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider','$authProvider'
  ,function($routeProvider,$locationProvider, $httpProvider, $compileProvider,$authProvider) {
  
  $locationProvider.html5Mode(false);

  $authProvider.google({
      clientId: '716057022202-ou4i924jvnae9qujukp1gs5bl5ivp5q1.apps.googleusercontent.com'
    });

  $routeProvider
  .when('/dashboard', {
  	templateUrl: 'views/dashboard.html',
  	controller:'DashboardCtrl',
  	controllerAs: 'dashboardCtrl'
  })
  .when('/progress', {
    templateUrl: 'views/progress.html',
    controller: 'ProgressCtrl',
    controllerAs: 'progressCtrl'
  })
  .when('/quiz', {
    templateUrl: 'views/quiz.html',
    controller: 'QuizCtrl',
    controllerAs: 'quizCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'loginCtrl'
  })
  .otherwise({
  	redirectTo:'/'
  });
  // Google
  $authProvider.google({
    url: '/auth/google',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: window.location.origin,
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 452, height: 633 }
  });

}]);

angular
	.module('openFinApp')
	.constant('CONSTANTS',{
		'API_URL': 'http://127.0.0.1:8000'
	});

angular
	.module('openFinApp')
	.run(run);

run.$inject = ['$rootScope', '$location'];

function run($rootScope, $location) {
	console.log('Application Initialized');
}

})();


