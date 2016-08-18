angular.module('medApp')
	.controller('regAndLoginCtrl', function($scope, $http, $state){

		$scope.createUser = function(){
			console.log('From the create user: ', $scope.user);
			$http.post('http://localhost:3000/create-user', JSON.stringify($scope.user))
		}

		$scope.loginUser = function(){
			console.log('From the login user: ', $scope.user);
			$http.post('http://localhost:3000/login', $scope.user);
			$state.go('breathe', {username: $scope.user.username});
		}


	})