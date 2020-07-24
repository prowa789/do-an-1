var Dienthoai = require('../model/dienthoai.model');
var queryString = require('query-string');

module.exports.filter = async function (req, res) {
    var dienthoai;
    var query = req.query; // lấy query của người dùng
    var wrongs = [];
    if (query.brand && query.gia) {
        var gia = query.gia.match(/\d/g).join(""); // trả về chuỗi, lấy sô từ chuỗi . join để nối chuỗi
        console.log(gia)
        //code
        if (gia.length == 4) {
            var min = parseInt(gia.slice(0, 2)) * 1000000;
            var max = parseInt(gia.slice(2, 4)) * 1000000;
            //tìm điện thoại có giá từ min đến max với thương hiệu
            dienthoai = await Dienthoai.find({
                $and : [
                    {"gia": {$gt: min, $lt: max} },{ "brand": query.brand}
                ]     
            });
        }
        else if (gia.length == 1) {
            var tien = parseInt(gia) * 1000000;
            dienthoai = await Dienthoai.find({
                $and : [
                    {"gia": {$lt: tien} },{ "brand": query.brand}
                ]     
            });
        }
        else if (gia.length == 2) {
            var tien = parseInt(gia) * 1000000;
            dienthoai = await Dienthoai.find({
                $and : [
                    {"gia": {$gt: tien} },{ "brand": query.brand}
                ]     
            });
        }
        // cau lenh truy van mongodb
       
    } else if (query.brand && !query.gia) {
        //code
        dienthoai = await Dienthoai.find({
            "brand": query.brand}
        );
    } else if (!query.brand && query.gia) {
        var gia = query.gia.match(/\d/g).join(""); // trả về chuỗi, lấy sô từ chuỗi . join để nối chuỗi
        //code
        if (gia.length == 4) {
            var min = parseInt(gia.slice(0, 2)) * 1000000;
            var max = parseInt(gia.slice(2, 4)) * 1000000;
            dienthoai = await Dienthoai.find(
                { "gia": { $gt: min, $lt: max } }
            );
        }
        else if (gia.length == 1) {
            var tien = parseInt(gia) * 1000000;
            dienthoai = await Dienthoai.find(
                { "gia": { $lt: tien } }
            );
        }
        else if (gia.length == 2) {
            var tien = parseInt(gia) * 1000000;
            dienthoai = await Dienthoai.find(
                { "gia": { $gt: tien } }
            );
        }

    }
    else if (!query.brand && !query.gia) {
        wrongs.push('Chưa chọn filter');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    if (dienthoai.length == 0 && (query.brand || query.gia)) {
        wrongs.push('Không có sản phẩm nào');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    var thong_bao = "Thương hiệu" + query.brand +" và "+"giá từ "
    res.render('product-list', {
        dienthoai: dienthoai,
    })
}
module.exports.search = async function (req, res) {
    // tim kiem dienthoai chứa từ mình nhập $regex: req.query.q
    // không phân biệt chữ hoa chữ thường $options: "$i"
    var wrongs=[];
    var dienthoai = await Dienthoai.find({
        $or: [
            { "brand": { $regex: req.query.q, $options: "$i" } }, { "name": { $regex: req.query.q, $options: "$i" } }
        ]
    });
    if(dienthoai.length==0){
        wrongs.push('Không tìm thấy');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    res.render('product-list', {dienthoai: dienthoai});
}