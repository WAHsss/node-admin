const bcrypt = require('bcrypt');
//加密是异步操作，需要await
const hash = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash);
            });
        });
    })
}

//比较被加密的两个值是否相等
const compare = (password , hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, hash, function(err, res) {
            resolve(res);
        });
    })
}

module.exports = {
    hash,
    compare
}