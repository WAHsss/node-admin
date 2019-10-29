var express = require('express');
var router = express.Router();
const {event} = require('../controllers/calendar');

router.get('/event',event);

module.exports = router;