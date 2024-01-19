var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
require('dotenv').config();
require('./utils/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var QuotationRouter = require('./routes/backend/quotation');
var getQuotationRouter = require('./routes/backend/getquotation');
var loginRouter = require('./routes/backend/login');
var quotationSentRouter = require('./routes/backend/quotationSent');
var insurerRouter = require('./routes/backend/insurer');
var getinsurerRouter = require('./routes/backend/getInsurer');
var getdetailsRouter = require('./routes/backend/getDetails');
var issueRouter = require('./routes/backend/issue');
var getDetailsCompRouter = require('./routes/backend/getDetailsComp');
var addDriversRouter = require('./routes/backend/addDrivers');

var app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quotation', QuotationRouter);
app.use('/getQuotations', getQuotationRouter);
app.use('/login', loginRouter);
app.use('/quotationSent', quotationSentRouter);
app.use('/insurer', insurerRouter);
app.use('/getinsurer', getinsurerRouter);
app.use('/getdetails', getdetailsRouter);
app.use('/issue', issueRouter);
app.use('/getDetailsComp', getDetailsCompRouter);
app.use('/addDrivers', addDriversRouter);

// catch 404 and forward to error handler
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
