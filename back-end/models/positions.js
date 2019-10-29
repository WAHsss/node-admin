const {Positions} = require('../util/db');

const save = (data)=>{
    const position = new Positions(data);
    return position.save();
}
const findAll = async ()=>{
    return await Positions.find({}).sort({_id:-1});
}

module.exports = { 
    save,
    findAll
}
     