var express = require('express');
var controller = require('../controller/userController');
var validate = require('../validate/validate');
var authMid =require('../middleware/authMiddleware');
var route=express.Router();


route.get('/user',authMid.authMiddleware, controller.index);
route.get('/user/search',authMid.authMiddleware,controller.search);
route.get('/user/create',authMid.authMiddleware, controller.create);
route.post('/user/create',authMid.authMiddleware,validate.postCreate,controller.postCreate);
route.get('/user/view/:id',authMid.authMiddleware,controller.view);
route.get('/user/delete/:id',authMid.authMiddleware,controller.delete);

module.exports = route;