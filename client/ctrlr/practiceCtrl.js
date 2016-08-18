angular.module('medApp')
	.controller('practiceCtrl', function($scope, $http, $state, $stateParams){


	function init() {	
			$http.get('http://localhost:3000/get-breath/' + $stateParams.username).then(function(response){

				console.log(response.data);
				// $scope.avgBreath = response.data;
			})
		}

// if the user is logged in
		if($stateParams.username){
			$scope.content = {
				name: "User is logged in as " + $stateParams["username"]
			}

			$scope.session = "Last Session"


	

init()

//If the user is a guest
		} else {
			$scope.content = {
				name: 'user is not logged in'
			}

			$scope.session = "Breath Stats"

			// $scope.date = 
			// $scope.avgInhale
			// $scope.avgExhale
			// $scope.avgBreath

		}

	})