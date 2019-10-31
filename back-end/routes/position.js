const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload');

const { list , save , remove , update , findOne , search} = require('../controllers/position')
router.route('/')
    .get(list)
    .post(uploadMiddleware,save)
    .delete(remove)
    .patch(uploadMiddleware,update);

router.get('/findOne',findOne);
router.get('/search',search)

module.exports = router;