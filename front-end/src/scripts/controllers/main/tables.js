import tableView from '../../views/main/tables.art';
import addView from '../../views/main/table.add.art';
import httpModel from '../../models/http';
import store from 'store';

async function _fetchData(req, res, type, keywords) {
    let typeString = '';
    if(keywords){
        typeString = `?type=${type}&keywords=${keywords}`;
    }else{
        typeString = `?type=${type}`;
    }
    let currpage = req.params.pid || 1;
    let count = 2;
    let result;
    if (type === 'list') {
        result = await httpModel.get({
            url: 'api/position',
            data: {
                start: (currpage - 1) * count,
                count: count
            }
        });
    } else if (type === 'search') {
        result = await httpModel.get({
            url: '/api/position/search',
            data: {
                keywords,
                start: (currpage - 1) * count,
                count: count
            }
        })
    }

    if (result.ret) {
        let pageNum = Math.ceil(result.data.total / count);
        res.render(tableView({
            list: result.data.list,
            pageNum
        }));
        //给当前页的页码添加active
        $(`.pagination li[data-pid=${currpage}]`).addClass('active');
        //边界判断
        ~~currpage === 1 ? $('.pagination li:first-child').addClass('disabled') : '';
        ~~currpage === pageNum ? $('.pagination li:last-child').addClass('disabled') : '';

        //点击对应页码执行的时间
        $('body').off('click', '.pagination li[data-pid]').on('click', '.pagination li[data-pid]', function () {
            let id = $(this).data('pid');
            res.go('/tables_list/' + id + typeString);
        })
        //上一页
        $('body').off('click', '.pagination li:first-child').on('click', '.pagination li:first-child', function () {
            res.go('/tables_list/' + (currpage <= 1 ? currpage : --currpage) + typeString);
        })
        //下一页
        $('body').off('click', '.pagination li:last-child').on('click', '.pagination li:last-child', function () {
            res.go('/tables_list/' + (currpage >= pageNum ? pageNum : ++currpage) + typeString);
        })
        //删除
        $('body').off('click', '.btn-delete').on('click', '.btn-delete', function () {
            _handleDelete(req,res, this);
        })
        //修改
        $('body').off('click', '.btn-update').on('click', '.btn-update', function () {
            _handleReadyModify(res, this);
        })

        $('body').off('click', '#searchPosition').on('click', '#searchPosition', function () {
            _handleBtnSearch(req, res)
        })
        $('body').off('keyup', '#searchValue').on('keyup', '#searchValue', function (evt) {
            let e = evt || event;
            _handleKeySearch(req, res, e,this)
        })
        $('li[data-rel=collapse]').on('click', ()=>{
            res.redirect('/tables_list/1?type=list');
        })
    }

}
export const list = async (req, res, next) => {
    if(Object.keys(req.params).length === 0){
        res.redirect('/tables_list/1?type=list');
    }else{
        let type = req.query.type || 'list';
        if(type === 'search'){
            await _fetchData(req, res, type,req.query.keywords);
        }else{
            await _fetchData(req, res, type);
        }
    }
}
//添加
export const add = (req, res, next) => {
    res.render(addView({
        title: 'NEW ITEM',
    }));
    $('#from-wrap').ajaxForm({
        url: '/api/position',
        method: 'POST',
        dataType: 'json',
        headers: {
            'X-Access-Token': store.get('token')
        },
        success: (result) => {
            if (result.ret) {
                res.go('/tables');
            } else {
                alert('服务器开小差了');
            }
        }
    });
}
//修改
export const modify = async (req, res, next) => {
    res.render(addView({
        title: 'MODIFY',
        item: req.body.item,
    }));
    $('#from-wrap').ajaxForm({
        url: 'api/position/',
        type: 'PATCH',
        dataType: 'json',
        headers: {
            'X-Access-Token': store.get('token')
        },
        success: (result) => {
            if (result.ret) {
                res.go('/tables?r=' + Math.random());
            } else {
                alert('服务器开小差了');
            }
        }
    });

}

function _handleBtnSearch(req, res) {
    let keywords = $('#searchValue').val();
    res.redirect(`/tables_list/1?type=search&keywords=${keywords}`);
}
function _handleKeySearch(req, res, evt,dom) {
    if (evt.keyCode === 13) {
        let keywords = $(dom).val();
        res.redirect(`/tables_list/1?type=search&keywords=${keywords}`);
    }
}

async function _handleReadyModify(res, dom) {
    let id = $(dom).data('id');
    let result = await httpModel.get({
        url: '/api/position/findOne',
        data: {
            id
        }
    });
    if (result.ret) {
        res.go('/tables_modify', { item: result.data })
    } else {
        alert('操作失败');
    }
}

async function _handleDelete(req,res, dom) {
    let id = $(dom).data('id');
    let companyLogo = $(dom).data('img');
    let result = await httpModel.update({
        data: {
            id,
            companyLogo
        },
        type: 'DELETE'
    });
    if (result.ret) {
        //  res.redirect(`/tables_list/1?type=search&keywords=${keywords}`);
        if(req.query.keywords){
            res.go('/tables_list/'+req.params.pid+'?type='+req.query.type+'&keywords='+req.query.keywords+'&r='+Math.random());
        }else{
            res.go('/tables_list/'+req.params.pid+'?type='+req.query.type+'&r='+Math.random());
        }
    } else {
        alert('操作失败');
    }
}
