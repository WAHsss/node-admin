const express = require('express');
const router = express.Router();

const {list,save} = require('../controllers/position')
router.get('/list',list);
router.post('/save',save)
module.exports = router;