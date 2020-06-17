var mongoose =require('mongoose');

var sessionSchema = new mongoose.Schema({
    tong_tien: Number,
    tong_san_pham: Number,
    gio_hang:[
        {
            phone_id :String,
            name : String,
            hinh_anh: String,
            gia : Number,
            gia_hien_thi :String,
            promotion: String,
            so_luong: Number
        }
    ]
})

var session = mongoose.model('Session',sessionSchema,'session');
// tham so 3 la ten bang trong database
module.exports = session;