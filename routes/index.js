var express = require('express');
var router = express.Router();
var mysql = require('../public/libs/dbConn');


/* GET home page. */
router.get('/', function(req, res, next) {
	//var sql=new mysql();
	
	mysql.test(function(err,message){
		if(err){
			console.log(message);
			return false;
		}
		
		console.log(message);
	});
	
	mysql.query('select * from nodejs',function(err,arr){
		if(err){
			console.log(arr);
			return false;
		}
		
		console.log(arr);
	});
	
	res.render('index', { title: 'Express' });
});

module.exports = router;
