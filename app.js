var createError = require('http-errors');
var express = require('express');


const fs = require("fs");

var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var cookieSession = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var emplRouter = require('./routes/employees');

var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var flightsRouter = require('./routes/flights');



var ReservationsRouter = require('./routes/reservations');




var app = express();

app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'session'
  , secret: 'secret'
  , httpOnly: true
  , maxAge: 30 * 60 * 1000
  , secure: false
  , overwrite: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use('/session', session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/employees', emplRouter);
app.use('/flights', flightsRouter);
app.use('/admin', adminRouter);

// Gestion des Hotels
const hotelManegment = require('./routes/Hotels/hotelManegment')
app.use('/hotels', hotelManegment)



app.use('/reservations', ReservationsRouter);


app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap



app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
