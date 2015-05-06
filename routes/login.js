var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');
var userModel = require('../libs/userModel');
var md5 = require('crypto-md5');


router.get('/', function(req, res, next) {
	res.render('login', {
		title: '登录',
		msg: ''
	});
});
router.post('/', function(req, res, next) {
	var params=req.body;
	
	var sqlStr=userModel.isAvailableUser();
	var sqlParams=[params.user_id,md5(params.pwd,'hex')];
	
	mysql.query(sqlStr,sqlParams,function(err,arr){
		if(err){
			arr=[];
		}
		
		if(arr.length>0){
			res.render('login', {
				title: '登录',
				msg: '登录成功'
			});
		}else{
			res.render('login', {
				title: '登录',
				msg: '登录失败'
			});
		}
	});
});

module.exports = router;
