var Dienthoai = require('../model/dienthoai.model');
var Binhluan = require('../model/binhluan.model');
var htmlDecode = require('js-htmlencode').htmlDecode;

module.exports.index = async function (req, res) {
    var page = parseInt(req.query.page) || 1; //http://www.nettruyen.com/?page=2
    var itemPerPage = 8;
    var start = itemPerPage * (page - 1)
    var end = itemPerPage * page;
    var dienthoai = await Dienthoai.find({});
    var length = dienthoai.length;
    var numberOfPage = 0;
    if (length % itemPerPage == 0) {
        numberOfPage = length / itemPerPage;
    }
    else {
        numberOfPage = parseInt(length / itemPerPage + 1);
    }
    dienthoai = dienthoai.slice(start, end);
    res.render('product-list', {
        dienthoai: dienthoai,
        page: page,
        number: numberOfPage,
    })
}
module.exports.show = async function (req, res) {
    var phone_id = req.params.id;
    var binhluan = await Binhluan.find({ id_sp: phone_id });
    var dienthoai = await Dienthoai.findOne({ phone_id: phone_id });
    var bai_viet="";
    if(dienthoai.bai_dang){
        bai_viet = htmlDecode(dienthoai.bai_dang);
    }
    res.render('single-product', { dienthoai: dienthoai, binhluan: binhluan ,bai_viet:bai_viet});
}
module.exports.comment_post = async function (req, res) {
    var phone_id = req.params.id;
    var binhluan = new Binhluan({
        id_sp: phone_id,
        ho_ten: req.body.ho_ten,
        noi_dung: req.body.noi_dung,
        email: req.body.email,
        sdt: req.body.sdt,
        ngay_gio: Date.now()
    });
    binhluan.save();
    res.redirect('/dienthoai/'+phone_id);
    

}

