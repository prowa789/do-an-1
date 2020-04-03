//import thu vien express
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userRoute = require('./routes/userRoute');
var productRoute=require('./routes/productRoute');
var loginRoute=require('./routes/loginRoute');
var authMid =require('./middleware/authMiddleware');
var sessionMiddleware = require('./middleware/sessionMiddleware');
var cartRoute = require('./routes/cartRoute');
//database
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/express-demo',{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
//dadasdsad

var app=express();
app.use(bodyParser.json()); // for parsing application/json
app.set('view engine','ejs');// dung template ejs
app.use(cookieParser('abcd1234'))
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('./public'));//khai bao de file tinh o thu muc public
app.use(sessionMiddleware.cc);
// routes
app.use('/',userRoute);
app.use('/',productRoute);
app.use('/',loginRoute);
app.use('/',cartRoute);

app.listen(3001);

//chon tat ca cac chu giong nhau ctrl +f2
