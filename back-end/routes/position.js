const express = require('express');
const router = express.Router();

const {list,save,remove} = require('../controllers/position')
router.get('/list',list);
router.post('/save',save);
router.delete('/remove',remove);
module.exports = router;