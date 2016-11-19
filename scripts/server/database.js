/*
 * 	Database 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

/*	Global	*/
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
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
//INSERT

function insertUser(user, then){
	new User(user).save(then);
}

function insertField(field, then){
	new Field(field).save(then);
}

function insertMatch(match, then){
	new Match(match).save(then);
}

//REMOVE

function removeUser(user, then){
	User.findOneAndRemove(user,then);
}

function removeField(field, then){
	Field.findOneAndRemove(field,then);
}

function removeMatch(match, then){
	Match.findOneAndRemove(match,then);
}

//UPDATE 

function updateMatch(match, then){
	var id = match._id;
	delete match._id;
	Match.findOneAndUpdate({_id: id},match,then);
}

function updateUser(user, then){
	var id = user._id;
	delete user._id;
	User.findOneAndUpdate({_id: id},user,
	function(err, userUpdated){
		then(err, userUpdated != null);
	});
}

//EXISTS

function existsUser(user, then){
	User.findOne(user).
	select('email').
	exec(function(err, userFound){
		then(err, userFound != null);
	});
}

function existsField(field, then){
	Field.findOne(field).
	select('name').
	exec(function(err, fieldFound){
		then(err, fieldFound != null);
	});
}

function existsMatch(match, then){
	Match.findOne(match).
	select('name').
	exec(function(err, matchFound){
		then(err, matchFound != null);
	});
}

//FIND ONE

function findUser(user, then){
	User.findOne(user).
	populate('groups.friends').
	exec(then);
}

function findField(field, then){
	Field.findOne(field).
	exec(then);
}

function findMatch(match, then){
	Match.findOne(match).
	populate('_field').
	populate('players._user').
	populate('admins').
	exec(then);
}

//FIND

function findUsers(user, then){
	User.find(user).exec(then);
}

function findFields(field, then){
	Field.find(field).exec(then);
}

function findMatchs(match, pagination, then){
	Match.find(match).
	populate('_field').
	populate('admins').
	skip(pagination.page * pagination.size).
	limit(pagination.size).
	exec(then);
}

//OTHERS

function findUserBasic(user, then){
	User.findOne(user).
	select('_id email').
	exec(then);
}




/* Exports */

//User
exports.findUserBasic = findUserBasic;
exports.existsUser = existsUser;
exports.insertUser = insertUser;
exports.findUser = findUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;

//Fields
exports.findFields = findFields;
exports.insertField = insertField;

//Matchs
exports.existsMatch = existsMatch;
exports.insertMatch = insertMatch;
exports.removeMatch = removeMatch;
exports.updateMatch = updateMatch;
exports.findMatchs = findMatchs;
exports.findMatch = findMatch;
