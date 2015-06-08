var express = require('express');
var router = express.Router();

var mysql = require('../libs/dbConn');
var blogsModel = require('../libs/blogsModel');

/*GET/POST save_blog page */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {

    try{
        var uid=req.session.views.userInfo[0].id;
        var content=req.body.content;

        $sqlStr=blogsModel.addBlog();

        mysql.query($sqlStr,['',content,uid],function(err,data){
            if (err) {
                res.render('error', {
                    title: 'ERROR',
                    message: err,
                    error: err
                });
                return false;
            }

            res.json({
                status:1,
                message:'success'
            });
        });

    }catch(e){
        res.render('login', {
            title: '登录',
            msg: ''
        });
    }
});

module.exports = router;
