import tableView from '../../views/main/tables.art';
import addView from '../../views/main/table.add.art';
import httpModel from '../../models/http';
export const list = async (req, res, next) => {
    let result = await httpModel.get({ url: 'api/position/list' });
    if (result.ret) {
        res.render(tableView({
            list: result.data
        }));
    }
}
export const add = (req, res, nex) => {
    res.render(addView());
    $('body').on('click', '#new-item',()=>{ 
        _handleNewItem(res) 
    })
}
async function _handleNewItem(res) {
    let data = $('#from-wrap').serialize();
    let result = await httpModel.post({
        url: '/api/position/save',
        data,
        boo: false
    })
    if (result.ret) {
        res.go('/tables');
    } else {
        alert('服务器开小差了');
    }
}