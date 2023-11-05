var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./database/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var checkerRouter = require('./routes/checker');
var addMemberRouter = require('./routes/addMember');
var getMemberRouter = require('./routes/getMembers');
var deleteMemberRouter = require('./routes/deleteMember');
var addProjectRouter = require('./routes/addProject');
var getPortfolioRouter = require('./routes/getProjects');
var deletePortfolioRouter = require('./routes/deleteProject');
var getSingleProjectRouter = require('./routes/getSingleProject');
var getImagesRouter = require('./routes/getimages');
var deleteImageRouter = require('./routes/deleteImage');
var updateProjectRouter = require('./routes/updateProject');
var changeStatusRouter = require('./routes/changeStatus');
var updateMemberRouter = require('./routes/updateMember');
var changepassRouter = require('./routes/changepass');

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
app.use('/login', loginRouter);
app.use('/checker', checkerRouter);
app.use('/addMember', addMemberRouter);
app.use('/getMembers', getMemberRouter);
app.use('/deleteMember', deleteMemberRouter);
app.use('/addProject', addProjectRouter);
app.use('/getPortfolio', getPortfolioRouter);
app.use('/deletePortfolio', deletePortfolioRouter);
app.use('/getSingleProject', getSingleProjectRouter);
app.use('/getImages', getImagesRouter);
app.use('/deleteImage', deleteImageRouter);
app.use('/updateProject', updateProjectRouter);
app.use('/changeStatus', changeStatusRouter);
app.use('/updateMember', updateMemberRouter);
app.use('/changepass', changepassRouter);

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
