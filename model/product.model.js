var mongoose =require('mongoose');

var productSchema = new mongoose.Schema({
    name :String,
    image: String,
    price : Number,
    description: String
})

var Product =mongoose.model('Product',productSchema,'product');
// tham so 3 la ten bang trong database

module.exports =Product;