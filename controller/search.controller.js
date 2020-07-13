var Dienthoai = require('../model/dienthoai.model');

module.exports.filter = async function (req, res) {
    var phone;
    var query = req.query; // lấy query của người dùng
    var wrongs = [];
    if (query.brand && query.gia) {
        //code
        if (query.gia.length == 4) {
            var min = parseInt(query.gia.slice(0, 2)) * 1000000;
            var max = parseInt(query.gia.slice(2, 4)) * 1000000;
        }
        else if (query.gia.length == 1) {
            var tien = parseInt(query.gia) * 1000000;
        }
        else if (query.gia.length == 2) {
            var tien = parseInt(query.gia) * 1000000;
        }
        phone = await Dienthoai.find(
            {
                "gia": { $gt: min, $lt: max },
                $or: [
                    { "brand": query.brand[0] }, { "brand": query.brand[1] }, { "brand": query.brand[2] }, { "brand": query.brand[3] }
                ]
            }
        );
    } else if (query.brand && !query.gia) {
        //code
        phone = await Dienthoai.find({
            $or: [
                { "brand": query.brand[0] }, { "brand": query.brand[1] }, { "brand": query.brand[2] }, { "brand": query.brand[3] }
            ]
        });
    } else if (!query.brand && query.gia) {
        //code
        if (query.gia.length == 4) {
            var min = parseInt(query.gia.slice(0, 2)) * 1000000;
            var max = parseInt(query.gia.slice(2, 4)) * 1000000;
            phone = await Dienthoai.find(
                { "gia": { $gt: min, $lt: max } }
            );
        }
        else if (query.gia.length == 1) {
            var tien = parseInt(query.gia) * 1000000;
            phone = await Dienthoai.find(
                { "gia": { $lt: tien } }
            );
        }
        else if (query.gia.length == 2) {
            var tien = parseInt(query.gia) * 1000000;
            phone = await Dienthoai.find(
                { "gia": { $gt: tien } }
            );
        }

    }
    else if (!query.brand && !query.gia) {
        wrongs.push('Chưa chọn filter');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    if (phone.length == 0 && (query.brand || query.gia)) {
        wrongs.push('Không có sản phẩm nào');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    // phân trang 
    var page = parseInt(req.query.page) || 1; //http://www.nettruyen.com/?page=2
    var itemPerPage = 8;
    var start = itemPerPage * (page - 1)
    var end = itemPerPage * page;
    var length = phone.length;
    var numberOfPage = 0;
    if (length % itemPerPage == 0) {
        numberOfPage = length / itemPerPage;
    }
    else {
        numberOfPage = parseInt(length / itemPerPage + 1);
    }
    phone = phone.slice(start, end);
    res.render('product-list', {
        dienthoai: phone,
        page: page,
        number: numberOfPage,
    })
}
module.exports.search = async function (req, res) {
    // tim kiem phone chứa từ mình nhập $regex: req.query.q
    // không phân biệt chữ hoa chữ thường $options: "$i"
    var wrongs=[];
    var phone = await Dienthoai.find({
        $or: [
            { "brand": { $regex: req.query.q, $options: "$i" } }, { "name": { $regex: req.query.q, $options: "$i" } }
        ]
    });
    if(phone.length==0){
        wrongs.push('Không có sản phẩm nào');
        res.render('product-list', { wrongs: wrongs });
        return;
    }
    var page = parseInt(req.query.page) || 1; //http://www.nettruyen.com/?page=2
    var itemPerPage = 8;
    var start = itemPerPage * (page - 1)
    var end = itemPerPage * page;
    var length = phone.length;
    var numberOfPage = 0;
    if (length % itemPerPage == 0) {
        numberOfPage = length / itemPerPage;
    }
    else {
        numberOfPage = parseInt(length / itemPerPage + 1);
    }
    phone = phone.slice(start, end); // start =0 end = 8 thì lấy các điện thoại từ 0->7
    res.render('product-list', {
        dienthoai: phone,
        page: page,
        number: numberOfPage,
    })

}