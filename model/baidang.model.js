var mongoose =require('mongoose');

var baidangSchema = new mongoose.Schema({
    tieu_de : String,
    noi_dung : String,
    chu_de : Array,
    tags : Array
})

var Baidang = mongoose.model('baidang',baidangSchema,'baidang');
// tham so 3 la ten bang trong database

module.exports = Baidang;