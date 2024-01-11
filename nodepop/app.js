var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerMiddleware = require('./lib/swaggerMiddleware');
const authJWSController = require('./controllers/AuthJWSController');
const jwsAuthMiddleware = require('./lib/jwsAuthMiddleware');
const errorHandler401 = require('./lib/errorHandler401');
const i18n = require('./controllers/i18nConfigure');
const localeChangerController = require('./controllers/localeChangerController');

require('./lib/connectMongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'NodePoP';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/anuncios', jwsAuthMiddleware, require('./routes/api/anuncios'));
app.post('/api/authenticate', authJWSController);
app.use('/api-doc', swaggerMiddleware);

app.use(i18n.init);
app.use('/', require('./routes/index'));
app.get('/locale-changer/:locale', localeChangerController);

// catch 401
app.use(errorHandler401);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
