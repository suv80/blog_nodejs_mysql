var express = require('express');
var router = express.Router();
var mysql = require('../public/libs/dbConn');


/* GET home page. */
router.get('/', function(req, res, next) {
	/*
	mysql.test(function(err,message){
		if(err){
			console.log(message);
			return false;
		}
		
		console.log(message);
	});
	*/
	mysql.query('select * from nodejs',function(err,arr){
		if(err){
			arr=[];
		}
		
		res.render('index', {
			title: 'Express',
			sqlResult: arr
		});
	});
});

module.exports = router;
