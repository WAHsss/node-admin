const tools = require('../util/tools');
const auth = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    let token = req.get('X-Access-Token');
    if (token) {
        if (req.path === '/isSignin') {
            res.render('success', {
                data: JSON.stringify({
                    username: req.session.username
                })
            })
        } else {
            let decode = await tools.varifyToken(token);
            if (decode) {
                next();
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '没有权限'
                    })
                })
            }
        }
    }else{
        res.render('fail', {
            data: JSON.stringify({
                message: '没有权限'
            })
        })
    }

}
module.exports = {
    auth
}