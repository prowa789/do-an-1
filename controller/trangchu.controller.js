var Dienthoai = require('../model/dienthoai.model');

module.exports.show = async function(req,res){
    var session = req.session.cart;
    if(!session){
        res.redirect('/'); 
        return;
    }
    var page=req.query.page; //page lhttp://www.nettruyen.com/?page=2
    page = parseInt(page);
    if(!page){page=1}
    var itemPerPage = 8;
    var start= itemPerPage*(page-1)
    var end = itemPerPage*page;
    var dienthoai =await Dienthoai.find({});
    var length = dienthoai.length;
    var numberOfPage = 0;
    if(length %  itemPerPage ==0){
        numberOfPage =length/itemPerPage;
    }
    else{
        numberOfPage = parseInt(length/itemPerPage +1);
    }
    dienthoai = dienthoai.slice(start,end);
    res.render('index',{
        dienthoai : dienthoai,
        page:page,
        number:numberOfPage,   
    })
}