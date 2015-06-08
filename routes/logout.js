var express = require('express');
var router = express.Router();

/*GET/POST logout page */
router.get('/', function (req, res, next) {

    req.session.views={};

    res.redirect('/');
});

module.exports = router;
