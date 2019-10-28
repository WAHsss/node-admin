var express = require('express');
var router = express.Router();
const {signup,hasSame,signin,signOut} = require('../controllers/user');
const {auth} = require('../middlewares/auth');
/* GET users listing. */
router.post('/signup', hasSame , signup);
router.post('/login', signin);
router.get('/signout' , signOut);
router.get('/isSignin', auth);

module.exports = router;
