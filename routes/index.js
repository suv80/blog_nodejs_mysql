var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');

/* GET home page. */
router.get('/', function (req, res, next) {
	mysql.query('select * from nodejs', function (err, arr) {
		if (err) {
			arr = [];
		}

		res.render('index', {
			title : 'Express',
			sqlResult : arr
		});
	});
});

module.exports = router;
