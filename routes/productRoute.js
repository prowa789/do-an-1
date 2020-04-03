var express = require('express');
var controller = require('../controller/productController');
var route=express.Router();
var autheMid =require('../middleware/authMiddleware');


route.get('/product',controller.index);
route.get('/product/search',controller.search);
route.get('/product/create',autheMid.authMiddleware,controller.getCreate);
route.post('/product/create',autheMid.authMiddleware,controller.postCreate);

module.exports = route;