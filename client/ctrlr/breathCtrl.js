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




//On keydown of space bar, initiate inhale 
//Gets time inhale started

window.addEventListener("keydown", (function(e){
	
if(e.key === " "){
	if(intBreathArr.length <= 5){
	var inhaleInitiation;
	// console.log('keydown listener');
	

		
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
		breathCycle.inhaleAvg = (inTotal/breathArr.length)/1000;
		breathCycle.exhaleAvg = (exTotal/breathArr.length)/1000;
		breathCycle.breathTotalAvg = (breathTotal/breathArr.length)/1000;

		return JSON.stringify(breathCycle);


}

function sendData(data){
	console.log('Data from breathCtrl: ', data);
	console.log('State params: ', $stateParams.username);
		if($stateParams.username){
		$http.post('http://localhost:3000/user-breath/' + $stateParams.username, data)
			.then(function(){
				$state.go('practice', {username:  $stateParams.username});
			})
		}else {
		$state.go('practice');
	}
		
} 







});







//If user is logged in, save that breathCycle to their profile
//Take the user to the recommendation page




//Based on breathCycle, create the recommendation
//Populate the recommendation with the last session
//Populate the recommendation 



























