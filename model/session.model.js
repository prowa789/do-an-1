var mongoose =require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart : [
        {
            productId : String,
            name : String,
            price : Number,
            image : String,
            description : String,
            numberOfItem : Number
        }
        
    ],
    totalProduct : {
        type: Number,
        default : 0
    }
})

var Session =mongoose.model('Session',sessionSchema,'session');
// tham so 3 la ten bang trong database

module.exports = Session;