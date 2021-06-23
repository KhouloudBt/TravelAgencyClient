var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ShowWorkersRouter = require('./routes/employees/showEmps');
var showWorkerRouter = require('./routes/employees/showEmp');
var editEmpRouter = require('./routes/employees/editEmp');

var createPersonnelRouter = require('./routes/employees/addEmp');
var authRouter = require('./routes/login/authRouter');
var deleteRouter = require('./routes/employees/deleteEmp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees/add', createPersonnelRouter);
app.use('/login', authRouter);
app.use('/employees/show', ShowWorkersRouter);
app.use('/employees/showOne/', showWorkerRouter);
app.use('/employees/edit', editEmpRouter);
app.use('/employees/delete', deleteRouter);

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

module.exports = app;
