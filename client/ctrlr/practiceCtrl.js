angular.module('medApp')
	.controller('practiceCtrl', function($scope, $http, $state, $stateParams){

$scope.avgInhale;
$scope.avgExhale;

	function init() {	
		console.log('INIT');
			$http.get('http://localhost:3000/get-breath/' + $stateParams.username).then(function(response){

				 

				$scope.avgBreath = response.data.breathTotalAvg;
				$scope.avgInhale = response.data.inhaleAvg;
				$scope.avgExhale = response.data.exhaleAvg;
				$scope.date = moment(response.data.created).format("ddd,  MMM. D, YYYY");

				recommendations($scope.avgInhale, $scope.avgExhale)
				// $scope.avgBreath = response.data;
			})
		}


		function recommendations(inhale, exhale){
			if(inhale > exhale){
					document.getElementById('recommendationContent').innerHTML = "In your last session, your inhales averaged longer than your exhales. Studies show this pattern can lead the body into fight or flight mode. Try inhaling for a count of four and exhaling for a count of eight to relax."

			} else {
				document.getElementById('recommendationContent').innerText = "Nice job! You have a great breath pattern. Now try slowing it down for deeper relaxation. Try inhaling for a count of five and exhaling for a count of five. (You can close your eyes if you want some extra zen.)"

			}
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

			var breathCycle = JSON.parse(window.sessionStorage.breathCycle);


			$scope.date = moment(breathCycle.created).format("ddd,  MMM. D, YYYY");
			$scope.avgInhale =  breathCycle.inhaleAvg;
			$scope.avgExhale = breathCycle.exhaleAvg;
			$scope.avgBreath = breathCycle.breathTotalAvg;
			console.log($scope.date);

			recommendations($scope.avgInhale, $scope.avgExhale);

		}

	})