var express = require('express');
var controller = require('../controller/admin.controller');
var validate = require('../validate/validate');
var authMid =require('../middleware/auth.middleware');
var route=express.Router();

route.get('/',authMid.authMiddleware, controller.sanpham);
route.get('/user',authMid.authMiddleware, controller.user);
route.get('/user/create',authMid.authMiddleware, controller.createUser);
route.post('/user/create',authMid.authMiddleware,validate.validateUser,controller.postCreateUser);
route.get('/user/delete/:id',authMid.authMiddleware,controller.delete);
route.get('/user/signout',authMid.authMiddleware,controller.signout);
//san pham
route.get('/sanpham',authMid.authMiddleware, controller.sanpham);
route.get('/sanpham/them',authMid.authMiddleware, controller.themsanpham);
route.post('/sanpham/them',authMid.authMiddleware, controller.themsanpham_post);
route.get('/sanpham/xoa/:id',authMid.authMiddleware, controller.xoasanpham);
route.get('/sanpham/sua/:id',authMid.authMiddleware, controller.suasanpham);
route.post('/sanpham/sua/:id',authMid.authMiddleware, controller.suasanpham_post);
//danh muc
route.get('/danhmuc',authMid.authMiddleware, controller.danhmuc);
route.get('/danhmuc/them',authMid.authMiddleware, controller.themdanhmuc);
route.post('/danhmuc/them',authMid.authMiddleware, controller.themdanhmuc_post);
route.get('/danhmuc/xoa/:id',authMid.authMiddleware, controller.xoadanhmuc);
route.get('/danhmuc/sua/:id',authMid.authMiddleware, controller.suadanhmuc);
route.post('/danhmuc/sua/:id',authMid.authMiddleware, controller.suadanhmuc_post);
//don hang
route.get('/donhang',authMid.authMiddleware, controller.donhang);
route.get('/donhang/chitiet/:id',authMid.authMiddleware, controller.chitietdonhang);

route.get('/user/doimatkhau',authMid.authMiddleware,controller.doimatkhau);
route.post('/user/doimatkhau',authMid.authMiddleware,controller.doimatkhau_post);

module.exports = route;