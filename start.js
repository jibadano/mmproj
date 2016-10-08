/*
 * 	Index 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

//Modules
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

//Server modules
var server = require('./scripts/server/server');
var database = require('./scripts/server/database');
var router = require('./scripts/server/router');
var requestHandler = require('./scripts/server/requestHandler');

//Config application
var app = express();
app.use(express.static('.'));
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY',  resave: false, saveUninitialized: true}));

//Parameters
app.locals.host = "0.0.0.0";
app.locals.port = 8080;

//Run application
router.init(app,requestHandler);
server.init(app);

