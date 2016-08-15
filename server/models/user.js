var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var BreathSchema = require('./breath');

var UserSchema = new mongoose.Schema({
	username: {
		type:String,
		required: true,
		trim: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true 
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	breaths:
		[BreathSchema]
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){
			return next(err)
		}
		user.password = hash;
		next();
	})
});

UserSchema.statics.authenticate = function(username, password, cb){
	User.findOne(({username: username}))
		.exec(function(error, user){
			if(error){
				return cb(error);
			} else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return cb(err);
			}
			bcrypt.compare(password, user.password, function(
				error, result){
				if(result === true){
					return cb(null, user);
				} else{
					return cb;
				}
			})

		})
}


	var User = mongoose.model('User', UserSchema);
	module.exports = User;