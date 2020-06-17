var Session = require('../model/session.model');
var Dienthoai = require('../model/dienthoai.model');
var Donhang = require('../model/donhang.model');

module.exports.add = async function (req, res) {
    var phone_id = req.params.phone_id;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/');
        return;
    }
    var dienthoai = await Dienthoai.findOne({ phone_id: phone_id });
    var session = await Session.findOne({ _id: sessionId });
    session.tong_san_pham++;
    session.tong_tien += dienthoai.gia;
    for (var i = 0; i < session.gio_hang.length; i++) {
        if (session.gio_hang[i].phone_id == phone_id) {
            session.gio_hang[i].so_luong++;
            session.save();
            res.redirect('/giohang');
            return;
        }
    }
    var item = {
        phone_id: dienthoai.phone_id,
        name: dienthoai.name,
        hinh_anh: dienthoai.hinh_anh,
        gia: dienthoai.gia,
        gia_hien_thi: dienthoai.gia_hien_thi,
        promotion: dienthoai.promotion,
        so_luong: 1
    }
    session.gio_hang.push(item);
    session.save();
    res.redirect('/giohang');
}

module.exports.show = async function (req, res) {
    var sessionId = req.signedCookies.sessionId;
    //code in here
    var session = await Session.findOne({ _id: sessionId });
    var tong_tien = convertMoney(session.tong_tien);
    res.render('cart', { session: session,tong_tien:tong_tien });
}
module.exports.dathang_post = async function (req, res) {
    var sessionId = req.signedCookies.sessionId;
    var session = await Session.findOne({ _id: sessionId });
    var donhang = new Donhang({
        ttkh :{
            ho_ten: req.body.ho_ten,
            email: req.body.email,
            sdt : req.body.sdt
        },
        tong_tien: session.tong_tien,
        tong_san_pham: session.tong_san_pham,
        san_pham:session.gio_hang,
        dia_chi_nhan_hang:req.body.dia_chi_nhan_hang,
        trang_thai: "chờ xử lý"
    })
    donhang.save();
    // clear giỏ hàng
    session.tong_tien =0;
    session.tong_san_pham =0;
    session.gio_hang = [];
    session.save();
    res.render('order-success');
}

module.exports.substract= async function (req, res) {
    var phone_id = req.params.phone_id;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/');
        return;
    }
    var dienthoai = await Dienthoai.findOne({ phone_id: phone_id });
    var session = await Session.findOne({ _id: sessionId });
    session.tong_san_pham--;
    session.tong_tien -= dienthoai.gia;
    for (var i = 0; i < session.gio_hang.length; i++) {
        if (session.gio_hang[i].phone_id == phone_id) {
            session.gio_hang[i].so_luong--;
            if(session.gio_hang[i].so_luong==0){
                session.gio_hang.pop(session.gio_hang[i]);
            }
            session.save();
            res.redirect('/giohang');
            return;
        }
    }
    res.redirect('/giohang');
}
module.exports.remove = async function (req, res) {
    var phone_id = req.params.phone_id;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/');
        return;
    }
    var dienthoai = await Dienthoai.find({ phone_id: phone_id });
    var session = await Session.findOne({ _id: sessionId });
    
    for (var i = 0; i < session.gio_hang.length; i++) {
        if (session.gio_hang[i].phone_id == phone_id) {
            session.tong_tien-=session.gio_hang[i].gia*session.gio_hang[i].so_luong;
            session.tong_san_pham -=session.gio_hang[i].so_luong;
            session.gio_hang.pop(session.gio_hang[i]);
            session.save();
            res.redirect('/giohang');
            return;
        }
    }
}

function convertMoney(money){
    var string="";
    var chuoi_ban_dau = money.toString();
    var len = money.toString().length;
    var k=len%3;
    len =len/3-1;
    var temp = chuoi_ban_dau.slice(0,k);
    string+=temp;
    for(var i=0;i<len;i++){
        if(k!=0){
            string+=".";
        }
        temp =chuoi_ban_dau.slice(k,k+3)
        string+=temp;
        k+=3;
    }
    return string;
}