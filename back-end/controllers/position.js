const positionModel = require('../models/positions');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const list = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let data = req.query;
    let result = await positionModel.findAll(data);
    if (result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    }else{
        res.render('fail', {
            data: JSON.stringify({
                message: '列表查询失败'
            })
        })
    }

}
const save = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let data = req.body;
    data.createTime = moment().format('YY-MM-DD HH:mm:ss');

    let result = await positionModel.save({
        companyLogo: req.filename,
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
const remove = async (req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8');
    fs.unlink(path.resolve(__dirname, `../public/uploads/${req.body.companyLogo}`), (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('文件已删除');
        }

    })
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
const update = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let data = {};
    let { filename, body } = req;
    if (filename) {
        fs.unlink(path.resolve(__dirname, `../public/uploads/${body.originLogo}`), (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('文件已删除');
            }


        });
        delete body.originLogo;
        data = { companyLogo: filename, ...body };
    } else {
        data = body;
    }
    let result = await positionModel.update(data);
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '修改成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据修改失败'
            })
        })
    }
}
const findOne = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let result = await positionModel.findOne(req.query.id);
    if (result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '查无此项数据'
            })
        })
    }
}
const search = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');
    let result = await positionModel.search(req.query);
    if (result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '查无此项数据'
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