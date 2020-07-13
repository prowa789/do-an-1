var express = require('express');
var controller = require('../controller/index.controller');
var route=express.Router();

route.get('/',controller.show);
module.exports = route;