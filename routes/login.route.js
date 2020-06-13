var express = require('express');
var authController = require('../controller/auth.controller');
var route=express.Router();

route.get('/',authController.login);
route.post('/',authController.postLogin);

module.exports = route;