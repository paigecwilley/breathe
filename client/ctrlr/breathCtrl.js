angular.module('medApp')
.controller('breathCtrl', function($scope, $http, $state, $stateParams){






	var inhaleInterval = 0;
	inhaleSecs = [];
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
	console.log("labels: ", labels);
	inhaleCircle.classList.add('inhale-class');
	exhaleCircle.classList.add('exhale-class');
	labels.forEach(function(v){
			v.classList.add('remove-display');
	})
	

}

//On keydown of space bar, initiate inhale 
//Gets time inhale started

window.addEventListener("keydown", (function(e){


	
	if(e.key === " "){
		if(intBreathArr.length <= 5){
			var inhaleInitiation;
	// console.log('keydown listener');
	
	animationState('add', 'inhale-bubble');
	animationState('remove', 'exhale-bubble');


	inhaleInitiation = Date.now();
	inhaleSecs.push(inhaleInitiation);

		// console.log('inhale initiation: ', inhaleInitiation);
		// console.log('inhale secs array ', inhaleSecs );

	}
}


}))




//Initiate beginning of exhale on keyup
window.addEventListener("keyup", (function(e){

	if(e.key === " "){
		var intBreathObj = {};
		inhaleBegin = inhaleSecs[0];
		inhaleSecs = [];


		if(intBreathArr.length <= 5){

			animationState('remove', 'inhale-bubble');
			animationState('add', 'exhale-bubble');

			exhaleInitiation = Date.now();
		// console.log(exhaleInitiation);
		// console.log('Inside the keyup')





		intBreathObj.inhaleTS=inhaleBegin;
		intBreathObj.exhaleTS=exhaleInitiation;

		console.log('intBreathObj:', intBreathObj)


		intBreathArr.push(intBreathObj);
	// console.log("Int Arr: ", intBreathArr);
	console.log("Intermediate Breath Array: ", intBreathArr);

	if(intBreathArr.length === 6){
		createBreathObjArr();
		endAnimation();
		sendData(createBreathCycle());
	}

}
}

}))




function createBreathObjArr(){
	for(var i = 0; i < intBreathArr.length; i++){
		var breathObj = {};
		breathObj.inhaleLength = intBreathArr[i].exhaleTS - intBreathArr[i].inhaleTS;
		if(i < 5) {
			breathObj.exhaleLength = intBreathArr[i + 1].inhaleTS - intBreathArr[i].exhaleTS;
			breathObj.totalLength = breathObj.inhaleLength + breathObj.exhaleLength;
		}
		console.log("breath Obj: " , breathObj);
		breathArr.push(breathObj);
			// breathObj = {};
			console.log("breath array: ", breathArr)
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

	console.log('From the breath cycle');
	for(var i = 0; i < breathArr.length - 1; i++){
		inTotal += breathArr[i].inhaleLength;
		exTotal += breathArr[i].exhaleLength;
		breathTotal += breathArr[i].totalLength;
	}

	console.log('Totals: ', inTotal, exTotal, breathTotal);

	breathCycle.created = moment().format();
	breathCycle.inhaleAvg = ((inTotal/breathArr.length)/1000).toFixed(2);
	breathCycle.exhaleAvg = ((exTotal/breathArr.length)/1000).toFixed(2);
	breathCycle.breathTotalAvg = ((breathTotal/breathArr.length)/1000).toFixed(2);

		//Send breathcycle to breath service
		// breathSrvc.breathCycle = breathCycle;

		breathCycle = JSON.stringify(breathCycle);

		window.sessionStorage.breathCycle = breathCycle;

		console.log(window.sessionStorage.breathCycle);

		return breathCycle;
	}

	function sendData(data){
		console.log('Data from breathCtrl: ', data);
		console.log('State params: ', $stateParams.username);
		if($stateParams.username){
			$http.post('http://localhost:3000/user-breath/' + $stateParams.username, data)
			// .then(function(){
			// 	$state.go('practice', {username:  $stateParams.username});
			// })
		}
		// else {
		// 	$state.go('practice');
		// }
		
	} 







});







//If user is logged in, save that breathCycle to their profile
//Take the user to the recommendation page




//Based on breathCycle, create the recommendation
//Populate the recommendation with the last session
//Populate the recommendation 



























