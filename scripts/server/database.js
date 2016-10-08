/*
 * 	Database 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

/*	Global	*/
var mongoose = require('mongoose');
var async = require('async');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Type = {string: 'str', boolean: 'boo', date: 'dat', list: 'lst'};
var Status = {draft: 'dft', published: 'psh', finished: 'fsh', archived:'ach'};

mongoose.connect('mongodb://localhost/database');

/*	Schemas	*/
var fieldSchema = new mongoose.Schema({
											name: {type:String, required:true, unique:true},
											desc: String,
											address: String,
											size: Number,
											rating: Number,
											phoneNumber: String,
											location:{lat: Number, lng: Number},
											reviews: [{_user: { type:ObjectId, ref: 'User'}, comment: String}]
});

var matchSchema = new mongoose.Schema({
											name: {type:String, required:true, unique:true},
											desc: String,
											status: String,
											players: [{_user: { type:ObjectId, ref: 'User'}, alter: Boolean, admin:Boolean, confirm:Boolean }],
											_field: { type:ObjectId, ref: 'Field'},
											date: Date,
											log: [{type: String, event: String}],
											admins: [{ type:ObjectId, ref: 'User'}]
});

var userSchema = new mongoose.Schema({
											email: {type:String, required:true, unique:true},
											password: {type:String, required:true},
											firstname: String,
											lastname: String,
											groups:[{name: String, friends: [{ type:ObjectId, ref: 'User'}]}],
											age: Number,
											position: String,
											about: String
});



/*	Models	*/
var Field = mongoose.model('Field', fieldSchema);
var Match = mongoose.model('Match', matchSchema);
var User = mongoose.model('User', userSchema);



/* Methods */

function findFields(fieldLike, then){
	Field.find(fieldLike).exec(function(err, fieldsFound){
		if(!fieldsFound)
			return then('No fields found', null);
		
		then(err, fieldsFound);
	});
}

function insertField(field, then){
	var newField = new User(field);
	newField.save(function(err){
		then(err, newField);
	});
}

function existsUser(user, then){
	User.findOne(user).
	select('_id email').
	exec(function(err, userFound){
		then(err, userFound);
	});
}

function insertUser(user, then){
	var newUser = new User(user);
	newUser.save(function(err){
		then(err, newUser);
	});
}


function findUser(user, then){
	User.findOne(user).populate('groups.friends').exec(function(err, userFound){
		if(!userFound)
			return then('User not found', null);
		
		then(err, userFound);
	});
}

function findUsers(userLike, then){
	User.find(userLike).exec(function(err, usersFound){
		if(!usersFound)
			return then('No users found', null);
		
		then(err, usersFound);
	});
}

function updateUser(user, then){
	var id = user._id;
	delete user._id;
	User.findOneAndUpdate({_id: id},user,
	function(err, userUpdated){
		then(err, userUpdated != null);
	});
}

function findMatchs(match,pagination, then){
	
	Match.find(match).populate('_field').populate('admins').skip(pagination.page * pagination.size).limit(pagination.size).
	exec(function(err, matchsFound){
		if(!matchsFound)
			return then('No matchs found', null);
		
		then(err, matchsFound);
	});
}

function findMatch(match, then){
	Match.findOne(match).populate('_field').populate('players._user').populate('admins').
	exec(function(err, matchFound){
		if(!matchFound)
			return then('Match not found', null);
		
		then(err, matchFound);
	});
}

function existsMatch(match, then){
	Match.findOne(match).
	select('name').
	exec(function(err, matchFound){
		then(err, matchFound != null);
	});
}


function insertMatch(match, then){
	var newMatch = new Match(match);
	newMatch.save(function(err){
		then(err, newMatch);
	});
}


function removeMatch(match, then){
	Match.findOneAndRemove(match,
	function(err, matchRemoved){
		then(err, matchRemoved != null);
	});
}

function updateMatch(match, then){
	var id = match._id;
	delete match._id;
	Match.findOneAndUpdate({_id: id},match,
	function(err, matchUpdated){
		then(err, matchUpdated != null);
	});
}



function reset(){

	var transaction = [];

	transaction.push(function(callback){
		mongoose.connection.collections['questions'].drop(function(err){callback(null,'done');});
	});
	transaction.push(function(callback){
		mongoose.connection.collections['surveys'].drop(function(err){callback(null,'done');});
	});
	transaction.push(function(callback){
		mongoose.connection.collections['users'].drop(function(err){callback(null,'done');});
	});
	transaction.push(function(callback){
		mongoose.connection.collections['answers'].drop(function(err){callback(null,'done');});
	});
	async.parallel(transaction, function(err, result) {
	});
}

/* Exports */

exports.existsUser = existsUser;
exports.insertUser = insertUser;
exports.findUser = findUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;

exports.findFields = findFields;
exports.insertField = insertField;


exports.existsMatch = existsMatch;
exports.insertMatch = insertMatch;

exports.removeMatch = removeMatch;
exports.updateMatch = updateMatch;
exports.findMatchs = findMatchs;
exports.findMatch = findMatch;
