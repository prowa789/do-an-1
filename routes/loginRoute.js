var express = require('express');
var authController = require('../controller/authController');
var route=express.Router();

route.get('/login',authController.login);
route.post('/login',authController.postLogin);

module.exports = route;