var Dienthoai = require('../model/dienthoai.model');

module.exports.show = async function(req,res){
    var session = req.session.cart;
    if(!session){
        res.redirect('/'); 
        return;
    }
    var dienthoai =await Dienthoai.find({}).sort({_id:-1}).limit(8); // hiển thị 8 điện thoại mới nhát
    res.render('index',{dienthoai : dienthoai,});
}