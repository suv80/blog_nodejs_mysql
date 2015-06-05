var express = require('express');
var router = express.Router();

/*GET/POST blogs_home page */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
    console.log(req.session);
    res.json({
        status: 'ok',
        content: req.body.content
    });
});

module.exports = router;
