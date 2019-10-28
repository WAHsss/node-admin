var express = require('express');
var router = express.Router();
const {list} = require('../controllers/position');

router.get('/list',list);

module.exports = router;