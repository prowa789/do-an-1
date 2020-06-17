var express = require('express');
var controller = require('../controller/dienthoai.controller');
var route=express.Router();

route.get('/',controller.index);
route.get('/:id',controller.show);
route.post('/:id',controller.comment_post);


module.exports = route;