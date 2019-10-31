import tableView from '../../views/main/tables.art';
import addView from '../../views/main/table.add.art';
import httpModel from '../../models/http';
import store from 'store';
export const list = async (req, res, next) => {
    let result = await httpModel.get({ url: 'api/position' });
    if (result.ret) {
        res.render(tableView({
            list: result.data
        }));
    }
    $('body').off('click','.btn-delete').on('click','.btn-delete',function(){
        _handleDelete(res,this);
    })
    $('body').off('click','.btn-update').on('click','.btn-update',function(){
        _handleReadyModify(res,this);
    })
    $('body').off('click','#searchPosition').on('click','#searchPosition',function(){
        _handleBtnSearch(res)
    })
    $('body').off('keyup','#searchValue').on('keyup','#searchValue',function(evt){
        let e = evt || event;
        _handleKeySearch(res,e)
    })
}
//添加
export const add = (req, res, next) => {
    res.render(addView({
        title : 'NEW ITEM',
    }));
    $('#from-wrap').ajaxForm({
        url : '/api/position',
        method : 'POST',
        dataType: 'json',
        headers:{
            'X-Access-Token': store.get('token')
        },
        success: (result)=>{
            if (result.ret) {
                res.go('/tables');
            } else {
                alert('服务器开小差了');
            }
        }
    });
    // $('#new-item').on('click',()=>{ 
    //     _handleNewItem(res) 
    // })
}
//修改
export const modify = async (req , res ,next)=>{ 
    res.render(addView({
        title : 'MODIFY',
        item : req.body.item,
    }));
    $('#from-wrap').ajaxForm({
        url : 'api/position/',
        type : 'PATCH',
        dataType: 'json',
        success: (result)=>{
            if (result.ret) {
                res.go('/tables');
            } else {
                alert('服务器开小差了');
            }
        }
    });
    // $('#new-item').on('click',()=>{ 
    //     _handleModify(res,id) 
    // })
}

async function _handleBtnSearch(res){
    let keywords = $('#searchValue').val();
    let result = await httpModel.get({
        url : '/api/position/search',
        data : {
            keywords
        }
    })
    if(result.ret&&result.data.length !== 0){
        res.render(tableView({
            list: result.data
        }));
    }else{
        alert('查无此项')
    }
}
async function _handleKeySearch(res,evt){
    if(evt.keycode === 13){
        let keywords = $(this).val();
        let result = await httpModel.get({
            url : '/api/position/search',
            data : {
                keywords
            }
        })
        if(result.ret&&result.data.length !== 0){
            res.render(tableView({
                list: result.data
            }));
        }else{
            alert('查无此项')
        }
    }
}

// async function _handleModify(res , id){
//     let data = $('#from-wrap').serialize();
//     let result = await httpModel.update({
//         type:'PATCH',
//         data : data + '&id=' + id
//     });
//     if(result.ret){
//         res.go('/tables');
//     }else{
//         alert(result.data.message);
//     }

// }
async function _handleReadyModify(res,dom){
    let id = $(dom).data('id');
    let result = await httpModel.get({
        url : '/api/position/findOne',
        data : {
            id
        }
    });
    if(result.ret){
        res.go('/tables_modify',{item : result.data})
    }else{
        alert('操作失败');
    }
}

async function _handleDelete(res,dom){
    let id = $(dom).data('id');
    let result = await httpModel.update({
        data : {
            id
        },
        type : 'DELETE'
    });
    if(result.ret){
        res.go('/table?r='+Math.random());
    }else{
        alert('操作失败');
    }
}

// async function _handleNewItem(res) {
//     let data = $('#from-wrap').serialize();
//     let result = await httpModel.post({
//         url: '/api/position',
//         data,
//         boo: false
//     })
//     if (result.ret) {
//         res.go('/tables');
//     } else {
//         alert('服务器开小差了');
//     }
// }