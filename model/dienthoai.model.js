var mongoose =require('mongoose');

var dienthoaiSchema = new mongoose.Schema({
    phone_id :String,
    danh_muc_id: String,
    name : String,
    gia: Number,
    gia_hien_thi:String,
    hinh_anh :String,
    so_luong :Number,
    cpu : String,
    ram : String,
    man_hinh: String,
    he_dieu_hanh: String,
    brand : String,
    camera_sau: String,
    camera_truoc: String,
    the_sim: String,
    bo_nho_trong :String,
    dung_luong_pin: String,
    promotion : String
})

var Dienthoai =mongoose.model('Dienthoai',dienthoaiSchema,'dienthoai');
// tham so 3 la ten bang trong database

module.exports = Dienthoai;