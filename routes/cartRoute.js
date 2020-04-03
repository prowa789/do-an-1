var express = require('express');
var controller = require('../controller/cartController');
var route=express.Router();


route.get('/cart/add/:productId', controller.cartAdd);
route.get('/cart/checkout', controller.checkout);
route.get('/cart/substract/:productId',controller.cartSubstract);
module.exports=route;