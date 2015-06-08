var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');//数据库操作基本库，要对数据库操作必须引入
var installModel = require('../libs/installModel');//数据库初始化的模型类，必须引入

/*GET/POST install page */
router.get('/', function(req, res, next) {
	res.render('install', {
		title: '初始化数据库',
		msg: '此操作将会在您的数据库服务器中创建数据库及其表，为了防止在初始化过程中可能产生的不可预知的后果，请备份好您的数据库。'
	});
});
router.post('/', function(req, res, next) {
    var sqlStr=installModel.createTables();
    
    var sqlParams=[];
    
	mysql.query(sqlStr,sqlParams,function(err,arr){
		if(err){
            res.render('error', {
                title: 'ERROR',
                message: err,
                error: err
            });
            return false;
		}
		
		if(arr.changedRows>=0){
			res.render('register', {
				title: '创建初始用户',
				msg: '初始化成功，请创建用户。'
			});
		}else{
			res.render('install', {
				title: '初始化数据库',
				msg: '初始化失败，请重新初始化。'
			});
		}
	});
	
});

module.exports = router;
