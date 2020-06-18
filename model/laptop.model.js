var mongoose = require("mongoose");

var laptop = new mongoose.Schema({
    laptopID: String,
    cpu: {
        type: String
    },
    ram: {
        type: String
    },
    o_cung: {
        type: String
    },
    man_hinh: {
        type: String
    },
    card_man_hinh: {
        type: String
    },
    cong_ket_noi: {
        type: String
    },
    he_dieu_hanh: {
        type: String
    },
    thiet_ke: {
        type: String
    },
    kich_thuoc: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    avatar: {
        type: String
    },
    slide: {
        type: String
    },
    rate: {
        type: Array
    },
    star: {
        type: String
    },
    promotion: {
        type: String
    },
    brand: {
        type: String
    }
})

var Laptop = mongoose.model('Laptop', laptop, 'laptop');
module.exports = Laptop;