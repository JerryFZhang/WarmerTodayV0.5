var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongojs = require('mongojs')
var db = mongojs('weather', ['user'])
var index = require('./routes/index')
var users = require('./routes/users')
var session = require('client-sessions')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// db init
createCollection('user')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  cookieName: 'session',
  secret: 'blahlbalhslasdlaisdjalisjd',
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))

app.use('/', index)
app.use('/user', isAuthenticated, users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

function createCollection (name) {
  db.createCollection(name, function (err) {
    if (err) {
      console.log('create collection:' + name + ' error!')
    } else {
      console.log('create collection:' + name + ' success!')
    }
  })
}

function isAuthenticated (req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
  if (req.user.authenticated) {
    return next()
  }

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/')
}

module.exports = app
