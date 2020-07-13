var express = require('express');
var controller = require('../controller/cart.controller');
var route=express.Router();

route.get('/add/:phone_id', controller.add);
route.get('/', controller.show);
route.post('/', controller.dat_hang_post);
route.get('/substract/:phone_id',controller.substract);
route.get('/remove/:phone_id',controller.remove);
route.get('/order-success');

module.exports=route;   