const {Users}= require('../util/db');

const save = (data)=>{
    const user = new Users(data);
    return user.save();
}

const findOne = (condition)=>{
    return Users.findOne(condition);
}

module.exports = {
    save,
    findOne
}