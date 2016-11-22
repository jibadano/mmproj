/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

var database = require('./database');
var eh = require('./errorHandler');
var atob = require('atob');

function redirect(req, res){
	res.redirect('/');
}

function logout(req, res) {
	delete req.session.user;
	res.end('{}');
}

function login(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);

	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	database.findUserBasic({email:email, password:password}, function(err, user) {
		if(err)
			return res.end(eh.DATABASE(err));

		if(!user)
			return res.end(eh.USER.AUTH_FAILED);

		req.session.user = user;
		res.end(JSON.stringify(user));
	});
}

function signin(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);

	getData(req, function(authenticationData){
		
		try{
			database.existsUser({email : authenticationData.user.email}, function(err, exists){
				if(err)
					return res.end(eh.DATABASE(err));
				
				if(exists)
					return res.end(eh.USER.ALRDY_EXTS);
				
				database.insertUser(authenticationData.user,function (err, user){
					if(err)
						return res.end(eh.DATABASE(err));

					delete user.password;	
					req.session.user = user;
					res.end(JSON.stringify(user));
				});
			});
		}
		catch(e){
			res.end(eh.GENERIC(err));
		}
	});
}


function execService(req, res) {

	getData(req, function(serviceExecution){
		if(!req.session.user){
			serviceExecution.err = eh.USER.SESSION_EXPIRED;
			return res.end(JSON.stringify(serviceExecution));
		}

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
			serviceExecution.err = eh.SERVICE_EXECUTION(e,serviceExecution.serviceId).err;
			res.end(JSON.stringify(serviceExecution));
		}
	});
}



var services = {
addUser : function (user, data, then){
	database.insertUser(data.user,function(err,user){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, '');
	});
},
addField : function (user, data, then){
	database.insertField(data.field,function(err,field){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, '');
	});
},
getFields : function (user, data, then){
	database.findFields({name: {$regex: new RegExp('^.*' + data.fieldName + '.*$', "i")}},function (err, fields){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, fields);
	});
},

getMatchs : function (user, data, then){
	data.match.status = 'public';
	database.findMatchs(data.match, data.pagination, function(err, matches){
		if(err)
			return then(eh.DATABASE(err),null);
		
		return then(null, matches);
	});
},

getMyMatchs : function (user, data, then){
	data.match.admins = user._id;
	database.findMatchs(data.match, data.pagination,function (err, matches){
		if(err)
			return then(eh.DATABASE(err),null);
		
		return then(null, matches);
	});
},

getMatch : function (user, data, then){
	//TODO puede buscar un match que sea privado
	database.findMatch({name: data.matchName}, function(err, match){
		if(err)
			return then(eh.DATABASE(err),null);
		
		if(!match)
			return then(eh.MATCH.NOT_FOUND, null);

		return then(null, match);
	});
},

addMatch : function(user, data, then){
	data.match.admins.push(user._id);
	database.existsMatch({name: data.matchName}, function(err, exists){
		if(err)
			return then(eh.DATABASE(err),null);
		
		if(exists)
			return then(eh.MATCH.ALRDY_EXTS, null);

		database.insertMatch(data.match, function(err, match){
			if(err)
				return then(eh.DATABASE(err),null);
				
			return then(null,match);
		});
	});
},

remMatch : function(user, data, then){
	//TODO puede borrar cualquier match
	database.removeMatch(data.match, function(err, match){
		if(err)
			return then(eh.DATABASE(err),null);
			
		return then(null,match);
	});
},

updMatch : function(user, data, then){
	//TODO puede actualizar cualquier match
	database.updateMatch(data.match, function(err, match){
		if(err)
			return then(eh.DATABASE(err),null);
			
		return then(null,match);
	});
},

confirmMatch : function(user, data,then){
	//TODO actualiza todo el match con lo que viene del servicio
	data.match.players.forEach(function(player){
		if(player._user._id == user._id){
			player.confirm = true;
			database.updateMatch(data.match, then);
		}
	});	
},

declineMatch : function(user, data,then){
	//TODO actualiza todo el match con lo que viene del servicio
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
	return then(null,user);
},

getUsers : function(user, data, then){
	database.findUsers({email: {$regex: new RegExp('^.*' + data.user.email + '.*$', "i")}}, function(err, users){
		if(err)
			return then(eh.DATABASE(err),null);
		
		return then(null, users);
	});
},

getGroups : function(user, data, then){
	database.findUser({_id: user._id}, function(err, userFound){
		if(err)
			return then(eh.DATABASE(err),null);

		if(!userFound)
			return then(eh.USER.NOT_FND,null);
		
		return then(null, userFound.groups);
	});
},

addGroup : function(user, data, then){
	database.findUser({_id: user._id}, function(err, user){
		if(err)
			return then(eh.DATABASE(err),null);

		if(!user)
			return then(eh.USER.NOT_FND,null);

		user.groups.push(data.group);
		user.save();

		return then(null, user);
	});
},

addFriend : function(user, data, then){
	database.findUser({_id: user._id},function(err, user){
		if(err)
			return then(eh.DATABASE(err),null);

		if(!user)
			return then(eh.USER.NOT_FND,null);
		
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
		if(err)
			return then(eh.DATABASE(err),null);

		if(!user)
			return then(eh.USER.NOT_FND,null);
		
		user.groups = data.groups;
		user.save();
		return then(null,user);
	});
},

remFriend : function(user, data,then){
	database.findUser({_id: user._id},function(err, user){
		if(err)
			return then(eh.DATABASE(err),null);

		if(!user)
			return then(eh.USER.NOT_FND,null);
		
		user.groups.forEach(function(group){
			if(group.name==data.groupName){
				var index = group.friends.indexOf(data.friend);
				if(index != -1){
					group.friends.splice(index,1);
					user.save();
				}
				return then(null, user);
			}
		});
	});
},

remGroup : function(user, data,then){
	database.findUser({_id: user._id},function(err, user){
		if(err)
			return then(eh.DATABASE(err),null);

		if(!user)
			return then(eh.USER.NOT_FND,null);
		
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

	req.addListener('end',function (){
		then(JSON.parse(data));
	});
}

exports.logout = logout;
exports.login = login;
exports.signin = signin;
exports.execService = execService;
exports.redirect = redirect;

