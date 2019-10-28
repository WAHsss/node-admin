const list = (req, res, next) => {
    res.render('success', {
        data : JSON.stringify({
            message: 'position'
        })
    })
}
module.exports = {
    list
}