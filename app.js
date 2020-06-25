var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('/Users/vishalsingh/Desktop/react-project/mern-admin-portal-project/route/book.js');var auth = require('..routes/auth.js');
var app = express();

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/adminportaldb',{
    useNewUrlParser:true,
    promiseLibrary: require('bluebird')})
    
    .then(() => console.log('Connection is successful'))
    .catch((err) => console.error(err));

//app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));
//app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/api/book', book);//router  then goes  to book
app.use('/api/auth',auth);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;