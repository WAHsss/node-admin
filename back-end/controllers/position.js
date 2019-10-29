const positionModel = require('../models/positions');
const list = async (req, res, next) => {
    let result = await positionModel.findAll();
    res.render('success', {
        data : JSON.stringify({
            list : result 
        })
    })
}
const save = async (req,res,next)=>{
    let result = await positionModel.save(req.body);
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '插入成功'
            })
        })
    } else{
        res.render('fail',{
            data : JSON.stringify({
                message : '数据插入失败'
            })
        })
    }
}
module.exports = {
    list,
    save
}