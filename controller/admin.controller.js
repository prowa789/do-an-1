var User = require('../model/user.model');
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
var Dienthoai = require('../model/dienthoai.model');
var Donhang = require('../model/donhang.model');
var Baidang = require('../model/baidang.model')
var htmlEncode = require('js-htmlencode').htmlEncode;
var htmlDecode = require('js-htmlencode').htmlDecode;

// admin
module.exports.index = function (req, res) {
    res.render('admin-dienthoai');
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
// điện thoại
module.exports.dienthoai = async function (req, res) {
    var dienthoai = await Dienthoai.find({});
    res.render('admin-dienthoai', { dienthoai: dienthoai });
}
module.exports.themdienthoai = function (req, res) {
    res.render('admin-themdienthoai');
}
module.exports.themdienthoai_post = function (req, res) {
    var item = req.body;
    var dienthoai = new Dienthoai(item);
    dienthoai.save();
    res.redirect('/admin/dienthoai');
}
module.exports.xoadienthoai = function (req, res) {
    var id_san_pham = req.params.id;
    Dienthoai.findOneAndDelete({phone_id:id_san_pham}).exec();
    res.redirect('/admin/dienthoai');
}
module.exports.suadienthoai = async function (req, res) {
    var id_san_pham = req.params.id;
    var dienthoai = await Dienthoai.findOne({ phone_id: id_san_pham });
    var bai_viet="";
    if(dienthoai.bai_dang){
        bai_viet = htmlDecode(dienthoai.bai_dang);
    }
    res.render('admin-suadienthoai', { dienthoai: dienthoai ,bai_viet:bai_viet});
    
}
module.exports.suadienthoai_post = function (req, res) {
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
            promotion: item.promotion,
            bai_dang : htmlEncode(item.bai_dang) 
        }
    }).exec();
    res.redirect('/admin/dienthoai');
}
// Đơn hàng
module.exports.donhang = async function (req, res) {
    var donhang = await Donhang.find({});
    res.render('admin-donhang', { donhang: donhang });
}
module.exports.chitietdonhang = async function (req, res) {
    var donhang_id = req.params.id;
    var donhang = await Donhang.findOne({ _id: donhang_id });
    var tong_tien = convertMoney(donhang.tong_tien);
    var thanh_tien = [];
    for (var i = 0; i < donhang.san_pham.length; i++) {
        thanh_tien.push(convertMoney(donhang.san_pham[i].gia * donhang.san_pham[i].so_luong));
    }
    res.render('admin-xemdonhang', {
        donhang: donhang,
        tong_tien: tong_tien,
        thanh_tien: thanh_tien
    });
}
module.exports.huydonhang = async function (req, res) {
    var donhang_id = req.params.id;
    var donhang = await Donhang.findByIdAndRemove({ _id: donhang_id });
    res.redirect('/admin/donhang');
}
module.exports.xacnhandonhang = async function (req, res) {
    var donhang_id = req.params.id;
    var donhang = await Donhang.findOne({ _id: donhang_id });
    // gửi mail
    
    var html = `<p><span style="font-size: 18px;">Đơn h&agrave;ng của <strong>${donhang.ttkh.ho_ten}  </strong>đ&atilde; được x&aacute;c nhận. Cảm ơn <strong>${donhang.ttkh.ho_ten} </strong> đ&atilde; mua h&agrave;ng tr&ecirc;n website của ch&uacute;ng t&ocirc;i.</span></p>
    <p><span style="font-size: 18px;"><strong>Chi tiết sản phẩm đ&atilde; mua</strong> :</span></p>
    <table style="width: 100%;">
        <tr>
            <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">M&atilde; sản phẩm</span></td>
            <td style="width: 25.0000%;"><span style="font-size: 18px;">T&ecirc;n sản phẩm</span></td>
            <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">Số lượng&nbsp;</span></td>
            <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">Đơn gi&aacute;</span></td>
        </tr>
        <tbody>
        ${createTableData(donhang)}
        </tbody>
    </table>
    <p><span style="font-size: 18px;"><strong>Địa chỉ nhận h&agrave;ng :</strong> ${donhang.dia_chi_nhan_hang}</span></p>
    <p><span style="font-size: 18px;"><strong>Tổng tiền : </strong>${convertMoney(donhang.tong_tien)} đ </span></p>`
    var transporter = nodemailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'mobileshoppingcart123@gmail.com',
            pass: 'tuoilolsanhvai'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Mobile Shopping',
        to: donhang.ttkh.email,
        subject: 'Đơn hàng từ Mobile Shopping',
        html: html
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.send("email k tồn tại");
            return;
        } else {
            console.log('Message sent: ' + info.response);
            res.redirect('/admin/donhang/chitiet/' + donhang._id);
        }
    });
    // xác nhận đơn hàng
    donhang.trang_thai = "đã xác nhận";
    donhang.save();
}

module.exports.bai_dang = async function(req,res){
    var baidang= await Baidang.find({});
    res.render('bai_dang',{baidang:baidang});
}
module.exports.bai_dang_post = async function(req,res){
  

}

// convert Money
function convertMoney(money) {
    var string = "";
    var len = money.toString().length;
    var k = len % 3;
    if (k == 0) { len = len / 3 } else { len = len / 3 - 1 };
    var temp = money.toString().slice(0, k);
    string += temp;
    for (var i = 0; i < len; i++) {
        if (k != 0) { string += "."; }
        temp = money.toString().slice(k, k + 3);
        string += temp;
        k += 3;
    }
    return string;
}

function createTableData(donhang){
    var data="";
    for(var i=0;i<donhang.san_pham.length;i++)
    {
        data +=`<tr>
        <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">${donhang.san_pham[i].phone_id}</span></td>
        <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">${donhang.san_pham[i].name}s<br></span></td>
        <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">${donhang.san_pham[i].so_luong} chiếc</span></td>
        <td style="width: 25%; text-align: center;"><span style="font-size: 18px;">${donhang.san_pham[i].gia_hien_thi} đ</span></td>
        </tr>`
    }
    return data;
}