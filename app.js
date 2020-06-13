require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var adminRoute = require('./routes/admin.route');
var dienthoaiRoute=require('./routes/dienthoai.route');
var loginRoute=require('./routes/login.route');
var authMid =require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');
var cartRoute = require('./routes/cart.route');
var trangchuRoute =require('./routes/trangchu.route');
//database
var mongoose =require('mongoose');
mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology:true
});

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.set('view engine','ejs');// dung template ejs
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('./public')); //khai bao de file tinh o thu muc public
app.use(sessionMiddleware.session);
// routes
app.use('/admin',adminRoute);
app.use('/dienthoai',dienthoaiRoute);
app.use('/login',loginRoute);
app.use('/cart',cartRoute);
app.use('/',trangchuRoute);
var port = process.env.PORT || 3001;


app.listen(port);


