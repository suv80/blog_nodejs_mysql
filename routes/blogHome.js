var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');

var blogsModel = require('../libs/blogsModel');

/*GET/POST blogs_home page */
router.get('/', function (req, res, next) {
    if (!req.session.views.userInfo) {
        res.render('login', {
            title: '登录',
            msg: ''
        });

        return false;
    }

    try {
        var sqlStr = blogsModel.fetchAll();
        var uid = req.session.views.userInfo[0].id;

        mysql.query(sqlStr, [uid], function (err, arr) {
            if (err) {
                res.render('error', {
                    title: 'ERROR',
                    message: err.stack,
                    error: err
                });
            }

            res.render('blogs_home', {
                title: "Blogs",
                list: arr
            });
        });
    } catch (e) {
        res.render('login', {
            title: '登录',
            msg: ''
        });
    }
});


module.exports = router;
