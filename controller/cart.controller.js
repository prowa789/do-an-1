var Dienthoai = require('../model/dienthoai.model');
var Donhang = require('../model/donhang.model');

module.exports.add = async function (req, res) {
    var phone_id = req.params.phone_id; // params là cái /:phone_id ở trong 'localhost:3001/giohang/add/:phone_id'
    var cart = req.session.cart;
    if (!cart) {
        res.redirect('/giohang');
        return;
    }
    var dienthoai = await Dienthoai.findOne({ phone_id: phone_id });
    cart.tong_san_pham++;
    cart.tong_tien += dienthoai.gia;
    for (var i = 0; i < cart.san_pham.length; i++) {
        if (cart.san_pham[i].phone_id == phone_id) {
            cart.san_pham[i].so_luong++;
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
    cart.san_pham.push(item);
    res.redirect('/giohang');
}
module.exports.show = async function (req, res) {
    //code in here
    var errors =[];
    var cart = req.session.cart;
    if (!cart) {
        res.redirect('/giohang');
        return;
    }
    if(cart.tong_san_pham==0){
        errors.push("Không có sản phẩm nào trong giỏ hàng");
    }
    var tong_tien = convertMoney(cart.tong_tien);
    res.render('cart', { cart: cart,tong_tien:tong_tien,errors:errors});
}
module.exports.dat_hang_post = async function (req, res) {
    var cart = req.session.cart;
    if (!cart) {
        res.redirect('/giohang');
        return;
    }
    if(cart.san_pham.length==0){
        res.redirect('/giohang');
        return;
    }
    var donhang = new Donhang({
        ttkh :{
            ho_ten: req.body.ho_ten,
            email: req.body.email,
            sdt : req.body.sdt
        },
        tong_tien: cart.tong_tien,
        tong_san_pham: cart.tong_san_pham,
        san_pham:cart.san_pham,
        dia_chi_nhan_hang:req.body.dia_chi_nhan_hang,
        trang_thai: "chờ xử lý"
    })
    donhang.save();
    // clear giỏ hàng
    cart = {
        tong_tien: 0,
        tong_san_pham: 0,
        san_pham:[]
    }
    req.session.cart = cart;
    res.render('order-success');
}
module.exports.substract= async function (req, res) {
    var phone_id = req.params.phone_id;
    var cart = req.session.cart;
    if (!cart) {
        res.redirect('/giohang');
        return;
    }
    var dienthoai = await Dienthoai.findOne({ phone_id: phone_id });
    cart.tong_san_pham--;
    cart.tong_tien -= dienthoai.gia;
    for (var i = 0; i < cart.san_pham.length; i++) {
        if (cart.san_pham[i].phone_id == phone_id) {
            cart.san_pham[i].so_luong--;
            if(cart.san_pham[i].so_luong==0){
                cart.san_pham.splice(i,1);
            }
            res.redirect('/giohang');
            return;
        }
    }
    res.redirect('/giohang');
}
module.exports.remove = async function (req, res) {
    var phone_id = req.params.phone_id;
    var cart = req.session.cart;
    if (!cart) {
        res.redirect('/giohang');
        return;
    }
    var dienthoai = await Dienthoai.find({ phone_id: phone_id });
    for (var i = 0; i < cart.san_pham.length; i++) {
        if (cart.san_pham[i].phone_id == phone_id) {
            cart.tong_tien-= cart.san_pham[i].gia*cart.san_pham[i].so_luong;
            cart.tong_san_pham -= cart.san_pham[i].so_luong;
            cart.san_pham.splice(i,1);
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
    if(k==0){len=len/3}else{len=len/3-1};
    var temp = chuoi_ban_dau.slice(0,k);
    string+=temp;
    for(var i=0;i<len;i++){
        if(k!=0){string+=".";}
        temp =chuoi_ban_dau.slice(k,k+3);
        string+=temp;
        k+=3;
    }
    return string;
}