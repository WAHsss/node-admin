const positionModel = require('../models/positions');
const moment = require('moment');
const list = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let result = await positionModel.findAll();
    res.render('success', {
        data : JSON.stringify(result)
    })
}
const save = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let data = req.body;
    data.createTime = moment().format('YY-MM-DD HH:mm:ss');
    let result = await positionModel.save(data);
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '插入成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据插入失败'
            })
        })
    }
}
const remove = async (req,res,next)=>{
    
}
module.exports = {
    list,
    save,
    remove
}