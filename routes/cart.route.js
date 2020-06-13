var express = require('express');
var controller = require('../controller/cart.controller');
var route=express.Router();


route.get('/add/:productId', controller.cartAdd);
route.get('/', controller.cart);
route.get('/substract/:productId',controller.cartSubstract);
module.exports=route;