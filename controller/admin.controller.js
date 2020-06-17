var shortid = require('shortid');
var User = require('../model/user.model');
var Dienthoai = require('../model/dienthoai.model');
var Danhmuc = require('../model/danhmuc.model');
var Donhang = require('../model/donhang.model');

//trang chủ
module.exports.index = function (req, res) {
    res.render('admin-sanpham');
}
// user
module.exports.user = function (req, res) {
    User.find().then(function (doc) {
        res.render('admin-user', { users: doc });
    })
}
module.exports.postCreateUser = function (req, res) {
    var item = req.body;
    var user = User(item);
    user.save();
    res.redirect('/admin/user');
}
module.exports.createUser = function (req, res) {
    res.render('admin-createuser');
}
module.exports.doimatkhau = function (req, res) {
    res.render('admin-doimatkhau');
}
module.exports.doimatkhau_post = async function (req, res) {
    var user1 = req.body;
    var userID = req.signedCookies.userID;
    var changeAllow = false;
    var user = await User.findById(userID);
    if (user.password == user1.oldPassword)
        changeAllow = true;
    else {
        var errors = [];
        errors.push('sai mật khẩu cũ');
        if (errors.length > 0) {
            res.render('admin-doimatkhau', { errors: errors });
            return;
        }

    }
    if (changeAllow) {
        User.updateMany({ _id: userID }, { $set: { password: user1.newPassword } }).exec();
        res.redirect('/admin/user');
    }
}
module.exports.delete = function (req, res) {
    var id = req.params.id;
    User.findByIdAndDelete(id).exec();
    res.redirect('/admin/user');
}
module.exports.signout = function (req, res) {
    res.clearCookie('userID');
    res.redirect('/admin')
}
// sản phẩm
module.exports.sanpham = async function (req, res) {
    var dienthoai = await Dienthoai.find({});
    res.render('admin-sanpham', { dienthoai: dienthoai });
}
module.exports.themsanpham = function (req, res) {
    res.render('admin-themsanpham');
}
module.exports.themsanpham_post = function (req, res) {
    var item = req.body;
    var dienthoai = new Dienthoai(item);
    dienthoai.save();
    res.redirect('/admin/sanpham');
}
module.exports.xoasanpham = function (req, res) {
    var id_san_pham = req.params.id;
    Dienthoai.findByIdAndDelete({ id_san_pham }).exec();
    res.redirect('/admin/sanpham');
}
module.exports.suasanpham = async function (req, res) {
    var id_san_pham = req.params.id;
    var dienthoai = await Dienthoai.findOne({ phone_id: id_san_pham });
    res.render('admin-suasanpham', { dienthoai: dienthoai });
}
module.exports.suasanpham_post = function (req, res) {
    var item = req.body;
    var id_san_pham = req.params.id;
    Dienthoai.updateOne({ phone_id: id_san_pham }, {
        $set:
        {
            danh_muc_id: item.danh_muc_id,
            name: item.name,
            gia: item.gia,
            gia_hien_thi: item.gia_hien_thi,
            hinh_anh: item.hinh_anh,
            so_luong: item.so_luong,
            cpu: item.cpu,
            ram: item.ram,
            man_hinh: item.man_hinh,
            he_dieu_hanh: item.he_dieu_hanh,
            brand: item.brand,
            camera_sau: item.camera_sau,
            camera_truoc: item.camera_truoc,
            the_sim: item.the_sim,
            bo_nho_trong: item.bo_nho_trong,
            dung_luong_pin: item.dung_luong_pin,
            promotion: item.promotion
        }
    }).exec();
    res.redirect('/admin/sanpham');
}
// Danh mục
module.exports.danhmuc = async function (req, res) {
    var danhmuc = await Danhmuc.find({});
    res.render('admin-danhmuc', { danhmuc: danhmuc });
}
module.exports.themdanhmuc = function (req, res) {
    res.render('admin-themdanhmuc');
}
module.exports.themdanhmuc_post = function (req, res) {
    var danhmuc = new Danhmuc(req.body);
    danhmuc.save();
    res.redirect('/admin/danhmuc');
}
module.exports.xoadanhmuc = function (req, res) {
    var id_danh_muc = req.params.id;
    Danhmuc.findOneAndDelete({ id_danh_muc }).exec();
    res.redirect('/admin/danhmuc');
}
module.exports.suadanhmuc = function (req, res) {
    var id_danh_muc = req.params.id;
    res.render('admin-suadanhmuc', { id: id_danh_muc });
}
module.exports.suadanhmuc_post = function (req, res) {
    var item = req.body;
    var id_danh_muc = req.params.id;
    Danhmuc.updateOne({ id_danh_muc: id_danh_muc }, { $set: { ten_danh_muc: item.ten_danh_muc } }).exec();
    res.redirect('/admin/danhmuc');
}
// Đơn hàng
module.exports.donhang = async function (req, res) {
    var donhang = await Donhang.find({});
    res.render('admin-donhang',{donhang:donhang});
}
module.exports.chitietdonhang = async function (req, res) {
    var donhang_id = req.params.id;
    var donhang = await Donhang.findOne({_id:donhang_id});
    res.render('admin-xemdonhang',{donhang:donhang});
}

