angular.module('medApp', ['ui.router']);
	angular.module('medApp')
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){

			$urlRouterProvider.otherwise('/');


			$stateProvider
				.state('/', {
					url: '/',
					templateUrl: 'index.html'
				})
				.state('login', {
					url: '/login',
					templateUrl: 'views/login.html',
					controller: 'regAndLoginCtrl'
				})
				.state('sign-up',{
					url: '/sign-up',
					templateUrl: 'views/signUp.html',
					controller: 'regAndLoginCtrl'
				})
				.state('breathe', {
					url: '/breathe/:username',
					templateUrl: 'views/breathe.html',
					controller: 'breathCtrl'
				})
				.state('practice', {
					url: '/practice/:username',
					templateUrl: 'views/practice.html',
					controller: 'practiceCtrl'
				})























	})