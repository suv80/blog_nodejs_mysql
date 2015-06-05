var express = require('express');
var router = express.Router();
var mysql = require('../libs/dbConn');
var userModel = require('../libs/userModel');
var md5 = require('crypto-md5');
var blogsModel = require('../libs/blogsModel');

var sourceReq = '';
var sourceRes = '';
var params = '';

/*GET/POST login page */
router.get('/', function (req, res, next) {
    sourceReq = req;
    sourceRes = res;
    console.log(req.session.views.userInfo);

    if (req.session.views.userInfo) {
        console.log('will jumping.');
        jumpBlogsHome();
    }else{
        res.render('login', {
            title: '登录',
            msg: ''
        });
    }
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
            updateLastLoginDate();
            sourceReq.session.views.userInfo = arr;
            jumpBlogsHome();
        } else {
            sourceRes.render('login', {
                title: '登录失败',
                msg: '登录失败'
            });
        }
    });
});

function updateLastLoginDate() {
    var sqlStr = userModel.updateLastLoginDate();

    mysql.query(sqlStr, [params.user_id], function (err, arr) {
        if (err) {
            sourceRes.render('error', {
                title: 'ERROR',
                message: err.stack,
                error: err
            });
        }
    });
}

function jumpBlogsHome() {
    var sqlStr = blogsModel.fetchAll();

    mysql.query(sqlStr, [], function (err, arr) {
        if (err) {
            sourceRes.render('error', {
                title: 'ERROR',
                message: err.stack,
                error: err
            });
        }

        sourceRes.render('blogs_home', {
            title: "Blogs",
            list: arr
        });
    });
}

module.exports = router;
