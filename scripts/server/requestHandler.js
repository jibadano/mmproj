/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

var database = require('./database');
var async = require('async');
var atob = require('atob');

function redirect(req, res){
	res.redirect('/');
}

function logout(req, res) {
	delete req.session.user;
	res.end('{}');
}

function login(req, res) {
	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	database.existsUser({email:email, password:password}, function(err, user){
		if(user){
			delete user.password;
			req.session.user = user;
		}
		res.end((user || err)? JSON.stringify(user) : '{err: "Authentication failed"}');
	});
}

function signin(req, res) {

	getData(req, function(authenticationData){
		
		try{
			database.existsUser({email : authenticationData.user.email}, function(err, exists){
				if(err)
					return res.end(JSON.stringify({err:err}));
				
				if(exists)
					return res.end('err: "Username already exists"');
				
				database.insertUser(authenticationData.user, function(err, user){
					req.session.user = user;
					return res.end((!user || err)? '{}' : '{err: "Registration failed"}');
				});
			});
		}
		catch(e){
			res.end(JSON.stringify(serviceExecution));
		}
	});
}


function execService(req, res) {
	getData(req, function(serviceExecution){
		
		try{
			services[serviceExecution.serviceId](req.session.user, serviceExecution.data, function(err, data){
				serviceExecution.data = data;
				if(err)
					serviceExecution.err = err;
				
				res.end(JSON.stringify(serviceExecution));
			});
		}
		catch(e){
			delete serviceExecution.data;
			serviceExecution.err = 'ServiceId ' + serviceExecution.serviceId + ' ERROR ' + 'Exception: ' + e;
			res.end(JSON.stringify(serviceExecution));
		}
	});
}

var services = {
getFields : function (user, data,then){
	database.findFields({name: {$regex: new RegExp('^.*' + data.fieldName + '.*$', "i")}},then);
},
getMatchs : function (user, data,then){
	data.match.status = 'public';
	database.findMatchs(data.match, data.pagination,then);
},

getMyMatchs : function (user, data,then){
	data.match.admins = user._id;
	database.findMatchs(data.match, data.pagination,then);
},

getMatch : function (user, data, then){
	database.findMatch({name: data.matchName},then);
},

addMatch : function(user, data, then){
	data.match.admins.push(user._id);
	database.insertMatch(data.match, then);
},

remMatch : function(user, data, then){
	database.removeMatch(data.match, then);
},

updMatch : function(user, data,then){
	database.updateMatch(data.match, then);
},

confirmMatch : function(user, data,then){
	data.match.players.forEach(function(player){
		if(player._user._id == user._id){
			player.confirm = true;
			database.updateMatch(data.match, then);
		}
	});
	
},

declineMatch : function(user, data,then){
	data.match.players.forEach(function(player){
		if(player._user._id == user._id){
			var i = data.match.players.indexOf(player);
			if( i > -1)
				data.match.players.splice(i,1);
			
			database.updateMatch(data.match, then);

		}
	});
	
},

getNextMatch : function(user, data){
	//TODO
},


getCurrentUser : function(user, data, then){
	return then('',user);
},

getUsers : function(user, data, then){
	database.findUsers({email: {$regex: new RegExp('^.*' + data.user.email + '.*$', "i")}}, function(err, usersFound){
		return then(err, usersFound);
	});
},

getGroups : function(user, data, then){
	database.findUser({_id: user._id}, function(err, userFound){
		return then(err, userFound.groups);
	});
},

addGroup : function(user, data, then){
	database.findUser({_id: user._id},function(err, user){
		user.groups.push(data.group);
		user.save();
		return then(err, user);

	});
},

addFriend : function(user, data, then){
	database.findUser({_id: user._id},function(err, user){
		user.groups.forEach(function(group){
			if(group.name==data.groupName){
				group.friends.push(data.friend);
				user.save();
				return then(err, user);
			}
		});
	});
},

updGroups : function(user, data,then){
	database.findUser({_id: user._id},function(err, user){
		
		user.groups = data.groups;
		user.save();
		then(err,user);
	});
},

remFriend : function(user, data,then){
	database.findUser({_id: user._id},function(err, user){
		user.groups.forEach(function(group){
			if(group.name==data.groupName){
				var index = group.friends.indexOf(data.friend);
				if(index != -1){
					group.friends.splice(index,1);
					user.save();
				}
				return then(err, user);
			}
			
		});
	});
},

remGroup : function(user, data,then){
	database.findUser({_id: user._id},function(err, user){
		user.groups.forEach(function(group){
			if(group.name==data.groupName){
				var index = user.groups.indexOf(group);
				if(index != -1){
					user.groups.splice(index,1);	
					user.save();
				}
				return then(err, user);
			}				
		});
	});
}
}















//Private methods

var getData = function(req, then){
	var data = '';
	req.on('data', function(chunk){
		 data+=chunk;
	 });

	req.addListener('end', function(){
		then(JSON.parse(data));
	});
}

var validSession =  function(session){
	return (session.user_id != null);
}

var OK = function(then){
	then();
	return 'OK';
}

exports.logout = logout;
exports.login = login;
exports.signin = signin;
exports.execService = execService;
exports.redirect = redirect;

