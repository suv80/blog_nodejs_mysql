var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');
var userModel = require('../libs/userModel');
var sessionModel = require('../libs/sessionModel');
var md5 = require('crypto-md5');

var sourceReq = '';
var sourceRes = '';
var params = '';

router.get('/', function (req, res, next) {
	res.render('login', {
		title : '登录',
		msg : ''
	});
});
router.post('/', function (req, res, next) {
	sourceReq = req;
	sourceRes = res;

	params = req.body;

	var sqlStr = userModel.isAvailableUser();
	var sqlParams = [params.user_id, md5(params.pwd, 'hex')];

	mysql.query(sqlStr, sqlParams, function (err, arr) {
		if (err) {
			arr = [];
		}

		if (arr.length > 0) {
			removeAllByUid(params.user_id);
		}
	});
});

function removeAllByUid(uid) {
	var sqlStr = sessionModel.removeAllByUid();

	mysql.query(sqlStr, [params.user_id], function (err, arr) {
		if (err) {
			sourceRes.render('error', {
				title : 'ERROR',
				message : err.stack,
				error : err
			});
		}

		if (arr.affectedRows >= 0) {
			insertSessionInfo();
		} else {
			sourceRes.render('login', {
				title : '登录',
				msg : '登录失败'
			});
		}
	})
}

function insertSessionInfo() {
	var cookie = new Date().getTime();
	cookie += " " + parseInt(Math.random() * 1000);
	cookie = md5(cookie, 'hex');

	sourceRes.cookie('SESSID', cookie);
	sourceRes.cookie('UID', md5(params.user_id, 'hex'));

	var sqlStr = sessionModel.insert();

	mysql.query(sqlStr, [cookie, params.user_id,md5(params.user_id,'hex')], function (err, arr) {
		if (err) {
			sourceRes.render('error', {
				title : 'ERROR',
				message : err.stack,
				error : err
			});
		}

		if (arr.insertId > 0) {
			updateLastLoginDate();
			sourceRes.render('my_home', {
				title : 'my home',
				msg : '登录成功'
			});
		} else {
			sourceRes.render('login', {
				title : '登录',
				msg : '登录失败'
			});
		}
	});
}

function updateLastLoginDate(){
	var sqlStr=userModel.updateLastLoginDate();
	
	mysql.query(sqlStr,[params.user_id],function(err,arr){
		if(err){
			sourceRes.render('error', {
				title : 'ERROR',
				message : err.stack,
				error : err
			});
		}
	});
}

module.exports = router;
