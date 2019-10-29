
const event = (req,res,next)=>{
    res.render('success',{
        data : JSON.stringify({
            events : "日历事件"
        })
    })
}

module.exports = {
    event
}