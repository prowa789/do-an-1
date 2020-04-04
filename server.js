//import thu vien express
require('dotenv').config();

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
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
//dadasdsad

var app=express();
app.use(bodyParser.json()); // for parsing application/json
app.set('view engine','ejs');// dung template ejs
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('./public'));//khai bao de file tinh o thu muc public
app.use(sessionMiddleware.cc);
// routes
app.use('/',userRoute);
app.use('/',productRoute);
app.use('/',loginRoute);
app.use('/',cartRoute);

var port = process.env.PORT || 3001;

app.get('/',function(req,res){
    res.send("alo1234");
})

app.listen(port);

console.log("server listening in port: "+port)
