var express = require('express');
var controller = require('../controller/trangchu.controller');
var route=express.Router();

route.get('/',controller.show);
module.exports = route;