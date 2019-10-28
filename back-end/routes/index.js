var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('success',{
    data : JSON.stringify({
      message : '欢迎来到后台'
    })
  });
});

module.exports = router;
