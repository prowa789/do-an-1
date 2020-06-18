var express = require('express');
var controller = require('../controller/admin.controller');
var validate = require('../validate/validate');
var authMid =require('../middleware/auth.middleware');
var route=express.Router();

route.get('/', controller.dienthoai);
route.get('/user',controller.user);
route.get('/user/create',controller.createUser);
route.post('/user/create',validate.validateUser,controller.postCreateUser);
route.get('/user/delete/:id',controller.delete);
route.get('/user/signout',controller.signout);
//san pham
route.get('/dienthoai', controller.dienthoai);
route.get('/dienthoai/them', controller.themdienthoai);
route.post('/dienthoai/them', controller.themdienthoai_post);
route.get('/dienthoai/xoa/:id', controller.xoadienthoai);
route.get('/dienthoai/sua/:id', controller.suadienthoai);
route.post('/dienthoai/sua/:id', controller.suadienthoai_post);

//don hang
route.get('/donhang', controller.donhang);
route.get('/donhang/chitiet/:id', controller.chitietdonhang);

route.get('/user/doimatkhau',controller.doimatkhau);
route.post('/user/doimatkhau',controller.doimatkhau_post);

module.exports = route;