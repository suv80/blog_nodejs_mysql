var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');

/* GET home page. */
router.get('/', function(req, res, next) {
	var loginInfo = req.session.views.userInfo;
	
	mysql.query('select * from user_info', function(err, arr) {
		if (err) {
            res.render('error', {
                title: 'ERROR',
                message: err,
                error: err
            });
            return false;
		}

		res.render('index', {
			title: 'Express',
			sqlResult: arr,
			userInfo: loginInfo
		});
	});
});

module.exports = router;