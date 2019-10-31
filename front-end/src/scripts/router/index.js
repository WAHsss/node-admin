import SMERouter from 'sme-router'
import * as home from '../controllers/main/home';
import * as calendar from '../controllers/main/calendar';
import * as tables from '../controllers/main/tables';
const router = new SMERouter('container');

router.use((req)=>{
    let hash = req.url.slice(1).split('_')[0];
    $(`.page-content li[data-url=${hash}]`).addClass('current').siblings().removeClass('current');
})

router.route('/home', home.artical);
router.route('/calendar',calendar.table);
router.route('/tables',tables.list);
router.route('/tables_add',tables.add);
router.route('/tables_modify',tables.modify);

router.route('*',(req,res)=>{
    res.redirect('/home')
})
