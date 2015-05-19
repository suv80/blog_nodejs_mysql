var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');

/* GET home page. */
router.get('/', function(req, res, next) {
	var loginInfo = req.session.views.userInfo;
	
	console.log(loginInfo);
	
	mysql.query('select * from user_info', function(err, arr) {
		if (err) {
			arr = [];
		}

		res.render('index', {
			title: 'Express',
			sqlResult: arr,
			userInfo: loginInfo
		});
	});
});

module.exports = router;