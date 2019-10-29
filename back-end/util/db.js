const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/node-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//集合key会自动变为复数
const Users = mongoose.model('users', {
    username: String,
    password: String
})
const Positions = mongoose.model('positions',{
  positionName: String,
  companyName: String,
  city: String,
  salary: String,
  createTime: String
})

module.exports = {
    Users,
    Positions
}