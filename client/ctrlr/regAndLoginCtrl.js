angular.module('medApp')
	.controller('regAndLoginCtrl', function($scope, $http, $state, $timeout, userService){
		
		$scope.createUser = function(event){
			event.preventDefault();
			// console.log('From the create user: ', $scope.user);
			$http.post('https://breathe.paigecwilley.com/api/create-user', JSON.stringify($scope.user)).then(function(successResponse){
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
			$http.post('https://breathe.paigecwilley.com/api/login', JSON.stringify($scope.user)).then(function(successResponse){
				if(successResponse.data) {
					userService.user = successResponse.data;
					$state.go('breathe', {username: userService.user.username});
				}
			}, function(failedResponse){
				console.log(failedResponse);
				$timeout(function(){
					$scope.failedResponse = failedResponse.data.message;
				}, 0);

			});
			
		}


	})