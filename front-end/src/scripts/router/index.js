import SMERouter from 'sme-router'
import * as home from '../controllers/main/home';
import * as calendar from '../controllers/main/calendar';

const router = new SMERouter('container');

router.use((req)=>{
    let hash = req.url.slice(1)
    $(`.page-content li[data-url=${hash}]`).addClass('current').siblings().removeClass('current');
})

router.route('/home', home.artical);
router.route('/calendar',calendar.table)
router.route('*',(req,res)=>{
    res.redirect('/home')
})
