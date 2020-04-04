var express = require('express');
var controller = require('../controller/cartController');
var route=express.Router();


route.get('/add/:productId', controller.cartAdd);
route.get('/checkout', controller.checkout);
route.get('/substract/:productId',controller.cartSubstract);
module.exports=route;