angular.module('medApp')
	.controller('regAndLoginCtrl', function($scope, $http, $state, userService){

		$scope.createUser = function(){
			console.log('From the create user: ', $scope.user);
			$http.post('https://45.79.94.101:3000/create-user', JSON.stringify($scope.user)).then(function(successResponse){
				console.log('From create user success response: ', successResponse);
			}, function(failedResponse){
				console.log('From create user failed response: ', failedResponse);
				$scope.failedResponse = failedResponse.data.message;
			})
		}

		$scope.loginUser = function(){
			console.log('From the login user: ', $scope.user);
			$http.post('https://45.79.94.101:3000/login', $scope.user).then(function(successResponse){
				if(successResponse.data) {
					userService.user = successResponse.data;
					$state.go('breathe', {username: userService.user.username});
				}
			}, function(failedResponse){
					$scope.failedResponse = failedResponse.data.message;
				});
			
		}


	})