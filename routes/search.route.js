var express = require('express');
var controller = require('../controller/search.controller');
var route=express.Router();

route.get('/filter',controller.filter);
route.get('/',controller.search);

module.exports = route;