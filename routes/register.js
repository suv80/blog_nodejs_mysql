var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');
var userModel = require('../libs/userModel');
var md5 = require('crypto-md5');

var request='';
var response='';

router.get('/',function(req, res, next){
	request=req;
	response=res;
	
	res.render('register',{
		title: '注册',
		msg: '感谢您的注册，注册后拥有更多权限。'
	});
})
router.post('/', function(req, res, next) {
	request=req;
	response=res;
	
	var params=req.body;
	
	var sqlStr=userModel.isExistUserId();
	
	console.log(sqlStr);
	
	mysql.query(sqlStr,[params.user_id],isExistCallBack);
	
});

function isExistCallBack(err,arr){
	if(err){
		arr=[];
	}
	
	if(arr.length>0){
		response.render('register',{
			title: '注册',
			msg: '用户名已存在，请选择其它用户名。'
		});
	}else{
		insertCallBack();
	}
}

function insertCallBack(){
	var params=request.body;
	
	console.log(request.body);
	
	var sqlStr=userModel.insert();
	
	console.log(sqlStr);
	
	mysql.query(sqlStr,[params.user_id,md5(params.pwd,'hex')],function(err,arr){
		var msg='';
		if(err){
			response.render('register',{
				title: '注册',
				msg: '注册时出现未知错误。'
			});
		}
		
		if(arr.insertId>0){
			response.render('login',{
				title: '登录',
				msg: '注册成功'
			});
		}else{
			response.render('register',{
				title: '注册',
				msg: '注册失败，请稍候再试。'
			});
		}
	});
	
}

module.exports = router;
