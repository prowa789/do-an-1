var Session = require('../model/session.model')
var Product =require('../model/product.model')
module.exports.cartAdd = async function(req,res){
    var productId=req.params.productId;
    var sessionId=req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/product'); 
        return;
    }
    var product = await Product.findById(productId);
    Session.findOneAndUpdate({ _id: sessionId },{ $inc: { totalProduct: 1 } },{new:true},function(doc){
        for (let i = 0; i < doc.cart.length; i++) {
            if (doc.cart[i].productId == productId) {
              doc.cart[i].numberOfItem ++;
              doc.save();
              return;
            }
        }
        var item={
            productId :productId,
            name : product.name,
            image: product.image,
            price : product.price,
            description: product.description,
            numberOfItem: 1,
        }
        doc.cart.push(item);
        doc.save();
    })
    res.redirect('/cart/checkout'); 
}
module.exports.checkout = function(req,res){
    var sessionId = req.signedCookies.sessionId;
    //code in here
    Session.findById(sessionId,function(doc){
        var sum= sum? sum:0;
        for(var i=0;i<doc.cart.length;i++){
            sum += doc.cart[i].price*doc.cart[i].numberOfItem;
        }
        res.render('checkout',{
            product:doc.cart,
            sum:sum
        });
    })
}
module.exports.cartSubstract = async function(req,res){
    var productId=req.params.productId;
    var sessionId=req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/product'); 
        return;
    }
    Session.findById({ _id: sessionId },function(doc){
        if(doc.totalProduct>0){
            doc.totalProduct--;
        }
        for (let i = 0; i < doc.cart.length; i++) {
            if (doc.cart[i].productId == productId) {
                if(doc.cart[i].numberOfItem>0){
                    doc.cart[i].numberOfItem --;
                    doc.save();
                }
                else{
                    doc.cart.pop(doc.cart[i]);
                    doc.save();
                }
                return;
            }
        }
        doc.save();
    });
    res.redirect('/cart/checkout'); 
}