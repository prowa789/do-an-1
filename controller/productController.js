var Product = require('../model/product.model');
var Session =require('../model/session.model')

module.exports.index = async function(req,res){
    var sessionId = req.signedCookies.sessionId;
    //neu k co sessionID thi quay lai trang product
    if(!sessionId){
        res.redirect('/product'); 
        return;
    }
    var page=req.query.page; //page lhttp://www.nettruyen.com/?page=2
    page = parseInt(page);
    if(!page){page=1}
    var itemPerPage = 8;
    var start= itemPerPage*(page-1)
    var end = itemPerPage*page;
    var product =await Product.find();
    var length = product.length;
    var numberOfPage = 0;
    if(length %  itemPerPage ==0){
        numberOfPage =length/itemPerPage;
    }
    else{
        numberOfPage = parseInt(length/itemPerPage +1);
    }
    product = product.slice(start,end);
    res.render('product',{
        product : product,
        page:page,
        number:numberOfPage,   
    })
 }
module.exports.search = async function(req,res){
    var q= req.query.q;
    var product =await Product.find();
    var matchedproduct = product.filter(function(product){
            return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('product',{product:matchedproduct});
    
}

module.exports.getCreate = function(req,res){
    res.render('productCreate');
}
module.exports.postCreate = function(req,res){
    var item =req.body;
    var product = Product(item);
    product.save();
    res.redirect('/product');
}