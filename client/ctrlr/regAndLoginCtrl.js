angular.module('medApp')
	.controller('regAndLoginCtrl', function($scope, $http, $state, userService){

		$scope.createUser = function(event){
			event.preventDefault();
			// console.log('From the create user: ', $scope.user);
			$http.post('http://localhost:3000/create-user', JSON.stringify($scope.user)).then(function(successResponse){
				userService.user = successResponse.data;
				$state.go('breathe', {username: userService.user.username});
				console.log('From create user success response: ', successResponse);
			}, function(failedResponse){
				console.log('From create user failed response: ', failedResponse);
				$scope.failedResponse = failedResponse.data.message;
			})
		}

		$scope.loginUser = function(event){
			// event.preventDefault();
			// console.log('From the login user: ', $scope.user);
			$http.post('http://localhost:3000/login', JSON.stringify($scope.user)).then(function(successResponse){
				if(successResponse.data) {
					userService.user = successResponse.data;
					$state.go('breathe', {username: userService.user.username});
				}
			}, function(failedResponse){
					$scope.failedResponse = failedResponse.data.message;
				});
			
		}


	})