import SMERouter from 'sme-router';
import {loginController} from '../controllers/sign/login';
import {signupController} from '../controllers/sign/signup';

const router = new SMERouter('container')


router.route('/login', loginController)
router.route('/signup',signupController)

router.route('*', (req, res, next) => {
    res.redirect('/login')
})
  