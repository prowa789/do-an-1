
var User = require('../model/user.model');

module.exports.authMiddleware = function(req,res,next){
    if(!req.signedCookies.userID){
        res.redirect('/login');
        return;
    }
    User.findById(req.signedCookies.userID,function(err,user){
        var user = user;
        if(!user){
        res.redirect('/login');
        return;
        }
        res.locals.user = user;
        next();
    });
}