require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var adminRoute = require('./routes/admin.route');
var dienthoaiRoute = require('./routes/dienthoai.route');
var loginRoute = require('./routes/login.route');
var authMiddleware= require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');
var cartRoute = require('./routes/cart.route');
var indexRoute = require('./routes/index.route');
var searchRoute = require('./routes/search.route');
var session = require('express-session');
var apiCartRoute = require('./api/routes/cart.routes');

//database
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var app = express();
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60 * 60 * 1000 } //session tồn tại trong 60 phút
})); 
app.use(bodyParser.json()); // for parsing application/json
app.set('view engine', 'ejs');// dung template ejs
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')); //khai bao de file tinh o thu muc public

// routes
app.use('/admin', authMiddleware,adminRoute);
app.use('/dienthoai', dienthoaiRoute);
app.use('/login', loginRoute);
app.use('/giohang',sessionMiddleware, cartRoute);
app.use('/',indexRoute);
app.use('/search', searchRoute);
app.use('/api/giohang',apiCartRoute);
var port = process.env.PORT || 3001;
app.listen(port);


