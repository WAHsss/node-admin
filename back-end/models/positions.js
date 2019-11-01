const { Positions } = require('../util/db');

const save = (data) => {
    const position = new Positions(data);
    return position.save();
}
const findAll = async ({ start, count }) => {
    let list = await Positions.find({}).sort({ _id: -1 }).limit(~~count).skip(~~start);
    let total = await Positions.find({}).count();
    return { list, total }
}
const findOne = async (id) => {
    return await Positions.findById(id);
}
const update = async (data) => {
    return await Positions.findByIdAndUpdate(data.id, data);
}
const remove = async (id) => {
    return await Positions.findByIdAndDelete(id)
}
const search = async ({ keywords, start, count }) => {
    let reg = new RegExp(keywords, 'gi')
    let list = await Positions.find({})
        .or([{
                companyName: reg
            },
            {
                positionName: reg
            },
            {
                city: reg
            }])
        .limit(~~count)
        .skip(~~start);
    let total = await Positions.find({})
        .or([{
                companyName: reg
            },
            {
                positionName: reg
            },
            {
                city: reg
            }])
        .count();

    return { list, total }

}
module.exports = {
    save,
    findAll,
    findOne,
    update,
    remove,
    search
}
