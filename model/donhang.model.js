var mongoose =require('mongoose');

var donhangSchema = new mongoose.Schema({
   id_kh :String,
   tinh_trang : String,
   ngay_lap :String,
   tong_gia : Number,
   noi_nhan :String
})

var Donhang =mongoose.model('Donhang',productSchema,'donhang');
// tham so 3 la ten bang trong database

module.exports = Donhang;