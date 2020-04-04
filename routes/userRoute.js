var express = require('express');
var controller = require('../controller/Controller');
var validate = require('../validate/validate');
var authMid =require('../middleware/authMiddleware');
var route=express.Router();


route.get('/',authMid.authMiddleware, controller.index);
route.get('/search',authMid.authMiddleware,controller.search);
route.get('/create',authMid.authMiddleware, controller.create);
route.post('/create',authMid.authMiddleware,validate.postCreate,controller.postCreate);
route.get('/view/:id',authMid.authMiddleware,controller.view);
route.get('/delete/:id',authMid.authMiddleware,controller.delete);

module.exports = route;