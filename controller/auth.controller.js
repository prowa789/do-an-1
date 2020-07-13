var User = require('../model/user.model');

module.exports.login = function (req, res) {
    res.render('login');
}
module.exports.postLogin = async function (req, res) {
    // lấy dữ liệu người dùng nhập từ textbox = req.body của modul body-paserd
    var username = req.body.username;
    var password = req.body.password;
    // tìm người dùng có username và password như đã nhập
    var user = await User.findOne({ username: username, password: password });
    var errors = [];
    //nếu không tồn tại thì thông báo lỗi 
    if (!user) {
        errors.push('Sai tên người dùng hoặc mật khẩu');
        res.render('login', { errors: errors });
        return;
    }
    // nếu tồn tại thì tạo phiên làm việc cho người dùng
    res.cookie('userID', user._id, { signed: true });
    res.redirect('/admin');

}