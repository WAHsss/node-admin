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

module.exports = {
    Users
}