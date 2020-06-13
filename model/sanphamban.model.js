var mongoose =require('mongoose');

var sanphambanSchema = new mongoose.Schema({
   id_sp :String,
   so_luong_ban :String
})

var sanphamban =mongoose.model('Sanphamban',sanphambanSchema,'sanphamban');
// tham so 3 la ten bang trong database

module.exports = Sanphamban;