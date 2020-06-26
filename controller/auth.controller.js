var User = require('../model/user.model');

module.exports.login = function (req, res) {
    res.render('login');
}
module.exports.postLogin = async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = await User.findOne({ username: username, password: password });
    var errors = [];
    if (!user) {
        errors.push('Sai tên người dùng hoặc mật khẩu');
    }
    if (errors.length > 0) {
        res.render('login', { errors: errors });
        return;
    }
    res.cookie('userID', user._id, { signed: true });
    res.redirect('/admin');

}