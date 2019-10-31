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
    console.log(data,req.filename);
    let result = await positionModel.save({
        companyLogo : req.filename,
        ...data
    });
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
    res.set('Content-type','application/json;charset=utf-8');
    let result = await positionModel.remove(req.body.id)
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '删除成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据删除失败'
            })
        })
    }
}
const update = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8');
    if(!req.filename){
        delete req.filename
    }
    let result = await positionModel.update(req.body);
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '修改成功'
            })
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message: '数据修改失败'
            })
        })
    }
}
const findOne = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8');
    let result = await positionModel.findOne(req.query.id);
    if(result){
        res.render('success',{
            data : JSON.stringify(result)
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '查无此项数据'
            })
        })
    }
}
const search = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8');
    let result = await positionModel.search(req.query.keywords);
    if(result){
        res.render('success',{
            data : JSON.stringify(result)
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '查无此项数据'
            })
        })
    }
}

module.exports = {
    list,
    save,
    remove,
    update,
    findOne,
    search
}