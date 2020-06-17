var mongoose = require('mongoose');

var donhangSchema = new mongoose.Schema({
    ttkh :{
        ho_ten: String,
        email: String,
        sdt : String
    },
    tong_tien: Number,
    tong_san_pham: Number,
    san_pham:[
        {
            phone_id :String,
            name : String,
            hinh_anh: String,
            gia : Number,
            gia_hien_thi :String,
            promotion: String,
            so_luong: Number
        }
    ],
    dia_chi_nhan_hang:String,
    trang_thai: String
})

var Donhang= mongoose.model('donhang', donhangSchema, 'donhang');
// tham so 3 la ten bang trong database

module.exports = Donhang;