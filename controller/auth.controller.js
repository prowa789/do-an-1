
var User = require('../model/user.model');

module.exports.login = function (req, res) {
    res.render('login');
}
module.exports.postLogin = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }, function (err, user) {
        var errors = [];
        if (!user) {
            errors.push('user name k tồn tại');
        }
        else if (user.password !== password) {
            errors.push('password sai');
        }
        if (errors.length > 0) {
            res.render('login', { errors: errors });
            return;
        }
        res.cookie('userID', user._id, { signed: true });
        res.redirect('/admin');
    });

}