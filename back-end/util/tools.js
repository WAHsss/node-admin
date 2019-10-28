const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
//加密是异步操作，需要await
const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                resolve(hash);
            });
        });
    })
}

//比较被加密的两个值是否相等
const compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            resolve(res);
        });
    })
}

const generatorToken = (username) => {
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_private_key.pem'));
        jwt.sign({ username }, cert , { algorithm: 'RS256' },(err,token)=>{
            resolve(token);
        });
    })
}

const varifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_public_key.pem')); // get public key
        jwt.verify(token, cert, function (err, decode) {
            resolve(decode)
        });
    })
}

module.exports = {
    hash,
    compare,
    generatorToken,
    varifyToken
}