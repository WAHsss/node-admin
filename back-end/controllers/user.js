const userModel = require('../models/user');
const tools = require('../util/tools');



const hasSame = async function (req, res, next) {
    let { username, password, confirmPwd } = req.body;
    if (password === confirmPwd) {
        let result = await userModel.findOne({ username });
        if (result) {
            res.render('fail.art', {
                data: JSON.stringify({
                    message: '用户已存在'
                })
            });
        } else {
            next();
        }
    } else {
        res.render('fail.art', {
            data: JSON.stringify({
                message: '两次输入的密码不一致'
            })
        });
    }

}
const signup = async function (req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    let { username, password } = req.body;
    //异步加密
    let hash = await tools.hash(password);
    let result = await userModel.save({
        username,
        password: hash
    });
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '用户注册成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户注册失败'
            })
        })
    }
}
const signin = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    let { username, password } = req.body;
    let result = await userModel.findOne({ username });
    if (result) {
        let {password: hash } = result;
        let compareResult = await tools.compare(password, hash);
        if (compareResult) {
            req.session.username = username;
            //登录成功后设置token
            let token = await tools.generatorToken(username);
            res.set('X-Access-Token', token);   
            res.render('success', {
                data: JSON.stringify({
                    message: '用户登录成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码不正确'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码不正确'
            })
        })
    }
}

const signOut = (req, res, next) => {
    res.set('Content-Type', 'applicaiton/json;sharset=utf-8');
    req.session = null;
    res.set('X-Access-Token', '');
    res.render('success', {
        data: JSON.stringify({
            message: '注销成功.'
        })
    })
}
module.exports = {
    signup,
    hasSame,
    signin,
    signOut
}