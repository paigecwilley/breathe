var mongoose = require('mongoose');
// var Schema = mongoose.Schema;



var BreathSchema = new mongoose.Schema({
	created: Date,
	inhaleAvg: Number, 
	exhaleAvg: Number, 
	breathTotalAvg: Number
});
// var BreathSchema = new mongoose.Schema();

// BreathSchema.add({
// 	created: Date,
// 	inhaleAvg: Number, 
// 	exhaleAvg: Number, 
// 	breathTotalAvg: Number

// })



// var BreathSession = mongoose.model('BreathSession', BreathSchema);

module.exports = BreathSchema;