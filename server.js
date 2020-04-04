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
mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology:true
});
console.log(process.env.MONGO_URL);
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
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/login',loginRoute);
app.use('/cart',cartRoute);

var port = process.env.PORT || 3001;

app.get('/',function(req,res){
    res.render('HomePage');
})

app.listen(port);

console.log("server listening in port: "+port);
