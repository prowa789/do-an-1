var mongoose =require('mongoose');

var binhluanSchema = new mongoose.Schema({
    id_sp :String,
    ho_ten :String,
    ngay_gio : Date,
    noi_dung:String,
    email:String,
    sdt:String,
})

var Binhluan = mongoose.model('Binhluan',binhluanSchema,'binhluan');
// tham so 3 la ten bang trong database

module.exports = Binhluan;