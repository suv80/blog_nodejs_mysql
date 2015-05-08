var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var md5 = require('crypto-md5');
var mysql = require('./libs/dbConn');
var sessionModel = require('./libs/sessionModel');

var routes = require('./routes/index');
var users = require('./routes/users');
//登录
var login = require('./routes/login');
//注册
var register = require('./routes/register');
//初始化数据库
var install = require('./routes/install');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
		extended : false
	}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**如果cookie中的uid不为空
 *查询当前uid与sessionid是与数据中保存的数据是否一致
 *不一致，跳转到登录页面
 */
app.use(function (req, res, next) {
	if (req.cookies.UID) {
		var sqlstr = sessionModel.getUidAndSid();

		console.log(sqlstr);

		mysql.query(sqlstr, [req.cookies.SESSID, req.cookies.UID], function (err, arr) {
			if (err) {
				res.render('error', {
					title : 'ERROR',
					message : err.message,
					error : err
				});
			}

			if (arr.length < 1) {
				res.clearCookie('SESSID');
				res.clearCookie('UID');

				res.render('login', {
					title : '登录',
					msg : '用户身份验证未通过，需要您重新登录'
				});
			} else {
				next();
			}
		});
	} else {
		next();
	}
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/reg', register);
app.use('/install', install);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			title : 'ERROR',
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		title : 'ERROR',
		message : err.message,
		error : {}
	});
});

module.exports = app;

app.listen(8080);
