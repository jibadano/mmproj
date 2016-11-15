/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

exports.GENERIC = function(err){
	return '{err:{code:"GENERIC",msg:' + err + '}}'
}

exports.DATABASE = function(err){
	return '{err:{code:"DATABASE",msg:"Database error: "' + err + '}}'
}

exports.SERVICE_EXECUTION = function(err, serviceId){
	return '{err:{code:"SERVICE_EXECUTION",msg:"Service id: "' + serviceId + ' message: "' + err + '}}'
}


exports.USER = {
	AUTH_FAILED: '{err:{code:"AUTH_FAILED",msg:"Authentication failed"}}',
	ALRDY_EXTS: '{err:{code:"ALRDY_EXTS",msg:"User already exists"}}',
	NOT_FND: '{err:{code:"NOT_FND",msg:"No user found"}}',
	ALRDY_LOGGED_IN: '{err:{code:"ALRDY_LOGGED_IN",msg:"User already logged in"}}',
	SESSION_EXPIRED: '{err:{code:"SESSION_EXPIRED",msg:"User session expired"}}'
};

exports.FIELD = {
	NOT_FND: '{err:{code:"NOT_FND",msg:"No field found"}}',
	ALRDY_EXTS: '{err:{code:"ALRDY_EXTS",msg:"Field already exists"}}',
};

exports.MATCH = {
	NOT_FND: '{err:{code:"NOT_FND",msg:"No Match found"}}',
	ALRDY_EXTS: '{err:{code:"ALRDY_EXTS",msg:"Match already exists"}}',
};


