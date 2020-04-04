var express = require('express');
var controller = require('../controller/Controller');
var route=express.Router();
var autheMid =require('../middleware/authMiddleware');


route.get('/',controller.index);
route.get('/search',controller.search);
route.get('/create',autheMid.authMiddleware,controller.getCreate);
route.post('/create',autheMid.authMiddleware,controller.postCreate);

module.exports = route;