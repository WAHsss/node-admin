const auth = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (req.session.username) {
        if (req.path === '/isSignin') {
            res.render('success', {
                data: JSON.stringify({
                    username: req.session.username
                })
            })
        } else {
            if (req.session.username) {
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