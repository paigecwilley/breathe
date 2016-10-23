angular.module('medApp')
.controller('breathCtrl', function($scope, $http, $state, $stateParams, userService, $timeout){


$scope.animationComplete = false;

$scope.recommendation = "Skip to recommendations";
$scope.inhaleInstructions = "Hold Space on Inhale";
$scope.exhaleInstructions = "Release Space on Exhale";

//If user is a guest, don't allow to skip to recommendations
if(!userService.user.username) {
	$scope.recommendation = "";
}

	var inhaleInterval = 0;
	var inhaleSecs = [];
	var exhaleExists = false;
	var inhaleBegin;
	var exhaleInitiation;

// intBreathObj = {};

var intBreathArr = [];


var breathArr = [];


function animationState(state, id){
	var bubble = document.getElementById(id);
	bubble.classList[state]('breath-animation');
}

function endAnimation(){
	var inhaleCircle = document.getElementById('inhale-bubble');
	var exhaleCircle = document.getElementById('exhale-bubble');
	var labels = document.querySelectorAll('.label');
	inhaleCircle.classList.remove('breath-animation');
	exhaleCircle.classList.remove('breath-animation');
	inhaleCircle.classList.add('inhale-class');
	exhaleCircle.classList.add('exhale-class');
	for(var i = 0; i < labels.length; i++) {
		labels[i].classList.add('remove-display');
	}
	// labels.forEach(function(v){
	// 	v.classList.add('remove-display');
	// })
	$scope.animationComplete = true;
	// console.log("This is the scope", $scope.recommendation)

}

//On keydown of space bar, initiate inhale 
//Gets time inhale started

window.addEventListener("keydown", keydownHandler);
window.addEventListener("touchstart", keydownHandler);

function keydownHandler(e) {
	if(e.key === " " || (e.target.id == "inhale-bubble" || e.target.id == "inhale-label")){
		if(intBreathArr.length <= 5){
			var inhaleInitiation;
			
			animationState('add', 'inhale-bubble');
			animationState('remove', 'exhale-bubble');

			inhaleInitiation = Date.now();
			inhaleSecs.push(inhaleInitiation);


		}
	}
}


//Initiate beginning of exhale on keyup
window.addEventListener("keyup", keyupHandler);
window.addEventListener("touchend", keyupHandler);

function keyupHandler(e) {
	console.log(e.target.id);
	if(e.key === " " || (e.target.id == "inhale-bubble" || e.target.id == "inhale-label")){
		var intBreathObj = {};
		inhaleBegin = inhaleSecs[0];
		inhaleSecs = [];


		if(intBreathArr.length <= 5){

			animationState('remove', 'inhale-bubble');
			animationState('add', 'exhale-bubble');

			exhaleInitiation = Date.now();

			intBreathObj.inhaleTS=inhaleBegin;
			intBreathObj.exhaleTS=exhaleInitiation;



			intBreathArr.push(intBreathObj);

			if(intBreathArr.length === 6){
				createBreathObjArr();
				endAnimation();
				$timeout(function(){$scope.recommendation="Go to recommendation"}, 0);
				sendData(createBreathCycle());
			}

		}
	}


}


function createBreathObjArr(){
	for(var i = 0; i < intBreathArr.length; i++){
		var breathObj = {};
		breathObj.inhaleLength = intBreathArr[i].exhaleTS - intBreathArr[i].inhaleTS;
		if(i < 5) {
			breathObj.exhaleLength = intBreathArr[i + 1].inhaleTS - intBreathArr[i].exhaleTS;
			breathObj.totalLength = breathObj.inhaleLength + breathObj.exhaleLength;
		}
		// console.log("breath Obj: " , breathObj);
		breathArr.push(breathObj);
			// breathObj = {};
			// console.log("breath array: ", breathArr)
		}
	}



//Create Object with average inhale time,
//average exhale time,
//average total breath time

var inTotal = 0;
var exTotal = 0;
var breathTotal = 0;

function createBreathCycle(){	
	var breathCycle = {};

	// console.log('From the breath cycle');
	for(var i = 0; i < breathArr.length - 1; i++){
		inTotal += breathArr[i].inhaleLength;
		exTotal += breathArr[i].exhaleLength;
		breathTotal += breathArr[i].totalLength;
	}

	// console.log('Totals: ', inTotal, exTotal, breathTotal);

	breathCycle.created = moment().format();
	breathCycle.inhaleAvg = ((inTotal/breathArr.length)/1000).toFixed(2);
	breathCycle.exhaleAvg = ((exTotal/breathArr.length)/1000).toFixed(2);
	breathCycle.breathTotalAvg = ((breathTotal/breathArr.length)/1000).toFixed(2);

		//Send breathcycle to breath service
		// breathSrvc.breathCycle = breathCycle;

		breathCycle = JSON.stringify(breathCycle);

		window.sessionStorage.breathCycle = breathCycle;

		// console.log(window.sessionStorage.breathCycle);

		return breathCycle;
	}

	function sendData(data){
		// console.log('Data from breathCtrl: ', data);
		// console.log('State params: ', $stateParams.username);
		if(userService.user.username){
			$http.post('https://breathe.paigecwilley.com/api/user-breath/' + userService.user.username, data)
		}
		
	} 



});






























