const multer = require('multer')
const path = require('path');
const randomstring = require("randomstring");

var filename = '';
const mineMap = {
    'image/png' : '.png',
    'image/jpg' : '.jpg',
    'image/jpeg' : '.jpeg',
    'image/gif' : '.gif'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) { 
        let { fieldname, mimetype } = file;
        filename = fieldname + '-'+ randomstring.generate(6) + mineMap[mimetype];
        cb(null, filename)
    }
})
const upload = multer({ storage: storage }).single('companyLogo');``

module.exports = (req , res , next)=>{
    upload(req, res, function (err){
        req.filename = filename;
        filename = '';
        next()
    })
}