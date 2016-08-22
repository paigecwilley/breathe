// ---server.js

var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

var bcrypt = require('bcrypt');

var session = require('express-session');
var app = express();

var User = require('./models/user');

var moment = require('moment');

var BreathSchema = require('./models/breath');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/med-app');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(session({
	secret: 'here is a secret i have made',
	resave: true,
	saveUninitialized: false
}));

//HTML5 Mode Rewrite


//Create user at signup

app.post('/create-user', function(req, res, next){
	console.log(req.body);
	if(req.body.username &&
		req.body.email &&
		req.body.password &&
		req.body.confirmPassword) {

		if(req.body.password != req.body.confirmPassword){
			var err = new Error('Passwords do not match');
			err.status = 400;
			return next(err);
		};

		//create user with form input
		var userData = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		};

		User.create(userData, function(error, user){
			if(error){
				return next(error);
			} else {
				console.log('Create worked');
			}
		});

	} else {
		var err = new Error('All fields requried');
		err.status = 400;
		return next(err);
	}
});

//Login user

app.post('/login', function(req, res, next){
	console.log(req.body);
	if ('OPTIONS = req.method') {
		return res.send(200);
	}
	if(req.body.username && req.body.password){
		User.authenticate(req.body.username, req.body.password, function(error, user){
			if(error || !user){
				var err = new Error('Wrong email or password');
				err.status = 401;
				console.log(err);
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.send(user.username);
			}
		});
	} else {
		var err = new Error('Username and password are required.');
		err.status = 401;
		return next(err);
	}
});

//Create user breath

app.post('/user-breath/:username', function(req, res, next){
	// console.log('Req body: ', req.body);
	// console.log('Req.params: ', req.params.username);

	var breathData = {
		created: req.body.created,
		inhaleAvg: req.body.inhaleAvg,
		exhaleAvg: req.body.exhaleAvg,
		breathTotalAvg: req.body.breathTotalAvg
	}
	



	User.findOne({"username" : req.params.username}, function(err, user){
		console.log(user);
		console.log("Req from the findOne :" , req.body);

		console.log(breathData);
		user.breaths.push(breathData);
		user.save(function(err, breathresult){
			console.log('push worked');
			res.send(breathresult);
		})


	});


});

//Get from server

app.get('/get-breath/:username', function(req, res, next){

	// res.send('hey there!\n');

	User.findOne({"username" : req.params.username}, 'breaths', function(err, user){
		if(err) return handleError(err);
		console.log(user.breaths);
		console.log("From moment: ", moment(user.breaths[user.breaths.length-1].created).format("ddd, MMM, D, YYYY"));
		res.send(user.breaths[user.breaths.length-1]);
	})
});

	//push into collection where username
	// db.users.update(
	// 	{username: req.params.username },
	// 	{$push: {breaths: breathData}}
	// )


	// User.create(breathData, function(error, user){
	// 	if(error){
	// 		return next(error);
	// 	} else {
	// 		console.log('You added a breath to a user!')
	// 	}
	// });




app.listen(3000, function(){
	console.log('App listening on port 3000');
})