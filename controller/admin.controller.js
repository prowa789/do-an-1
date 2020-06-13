var shortid = require('shortid');
var User = require('../model/user.model');
var Dienthoai =require('../model/dienthoai.model');
var Danhmuc = require('../model/danhmuc.model')

module.exports.index = function(req,res){
    res.render('admin-sanpham');
}
// module.exports.search = function(req,res){
//     var q= req.query.q;
//     User.find().then(function(user){
//         var matcheduser = user.filter(function(user){
//             return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//         });
//         res.render('admin-user',{user:matcheduser});
//     })
// }
module.exports.user= function(req,res){
    User.find().then(function(doc){
        res.render('admin-user',{users:doc});
    })
}
module.exports.postCreateUser = function(req,res){
    var item =req.body;
    var user = User(item);
    user.save();
    res.redirect('/admin/user');
}
module.exports.createUser = function(req,res){
    res.render('admin-createuser');
}
module.exports.doimatkhau = function(req,res){
    res.render('admin-doimatkhau');
}
module.exports.doimatkhau_post = async function(req,res){
    var user1= req.body;
    var userID=req.signedCookies.userID;
    var changeAllow= false;
    var user = await User.findById(userID);
    if(user.password == user1.oldPassword)
        changeAllow=true;
    else{
        var errors =[];
        errors.push('sai mật khẩu cũ');
        if(errors.length>0){
            res.render('admin-doimatkhau',{errors:errors});
            return;
        }
        
    }
    if(changeAllow){
        await User.findOneAndUpdate({_id:userID},{$set:{password:user1.newPassword}});
        res.redirect('/admin/user');
    }
}
module.exports.delete = function(req,res){
    var id = req.params.id;
    User.findByIdAndDelete(id).exec();
    res.redirect('/admin/user');
}

module.exports.signout= function(req,res){
    res.clearCookie('userID');
    res.redirect('/admin')
}

module.exports.sanpham = async function(req,res){
    var dienthoai =await Dienthoai.find({});
    res.render('admin-sanpham',{dienthoai:dienthoai});
}
module.exports.themsanpham = function(req,res){
    res.render('admin-themsanpham');
}
module.exports.themsanpham_post = function(req,res){
    var item = req.body;
    var dienthoai = new Dienthoai(item);
    dienthoai.save();
    res.redirect('/admin/sanpham');
}
module.exports.xoasanpham = function(req,res){
}
module.exports.danhmuc = async function(req,res){
    var danhmuc = await Danhmuc.find({});
    res.render('admin-danhmuc',{danhmuc:danhmuc});
}
module.exports.themdanhmuc = function(req,res){
    res.render('admin-themdanhmuc');
}
module.exports.themdanhmuc_post = function(req,res){
    var danhmuc= new Danhmuc(req.body);
    danhmuc.save();
    res.redirect('/admin/danhmuc')
}
module.exports.xoadanhmuc = function(req,res){
    var id_danh_muc = req.params.id;
    Danhmuc.findOneAndDelete({id_danh_muc:id_danh_muc}).exec();
    res.redirect('/admin/danhmuc');
}
module.exports.donhang = function(req,res){
    res.render('admin-donhang');
}
module.exports.chitietdonhang = function(req,res){
    res.render('admin-xemdonhang');
}

