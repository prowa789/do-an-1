var mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    name :String,
    username :String,
    password:String,
    phone : String
})

var User =mongoose.model('User',userSchema,'user');

module.exports =User;