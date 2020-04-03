var shortid = require('shortid');
var User = require('../model/user.model');

module.exports.index = function(req,res){
    User.find().then(function(doc){
        res.render('user',{user:doc});
    })
    
}
module.exports.search = function(req,res){
    var q= req.query.q;
    User.find().then(function(user){
        var matcheduser = user.filter(function(user){
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('user',{user:matcheduser});
    })
    
}
module.exports.postCreate = function(req,res){
    var item =req.body;
    var user = User(item);
    user.save();
    res.redirect('/user');
}
module.exports.create = function(req,res){
    res.render('userCreate');
}
module.exports.view = function(req,res){
    var id = req.params.id;
    User.findById(id,function(user){
        res.render('userView',{user:user});
    })
   
}
module.exports.delete = function(req,res){
    var id = req.params.id;
    User.findByIdAndDelete(id).exec();
    res.redirect('/user');
}
