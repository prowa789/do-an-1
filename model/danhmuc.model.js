var mongoose =require('mongoose');

var danhmucSchema = new mongoose.Schema({
   id_danh_muc :String,
   ten_danh_muc :String
})

var Danhmuc =mongoose.model('Danhmuc',danhmucSchema,'danhmuc');
// tham so 3 la ten bang trong database

module.exports = Danhmuc;