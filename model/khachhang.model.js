var mongoose =require('mongoose');

var khachhangSchema = new mongoose.Schema({
   ho_ten: String,
   tai_khoan:String,
   mat_khau:String,
   sdt: String,
   email:String,
   cart : [
    {
        productId : String,
        name : String,
        gia : Number,
        hinh_anh : String,
        so_luong : String,
    }
    ],
    totalProduct : {
        type: Number,
        default : 0
    }   
})

var Danhmuc = mongoose.model('Khachhang',khachhangSchema,'khachhang');

// tham so 3 la ten bang trong database

module.exports = Khachhang;