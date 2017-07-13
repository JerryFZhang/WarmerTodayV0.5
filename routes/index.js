var express = require('express')
var session = require('express-session')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('weather', ['user'])
const DarkSky = require('dark-sky')
var crypto = require('crypto')
// https://www.npmjs.com/package/node-geocoder
var NodeGeocoder = require('node-geocoder')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
// Use synchronous JavaScript call to fetch API id stored in forecast.txt.
// Use API id fetched from file system.
const forecast = new DarkSky('a663e12e77b9cfe68f9151767de5a597')
const deployAddress = 'http://localhost:3000/activation/'

// logs
const log4js = require('log4js')
log4js.loadAppender('file')
log4js.addAppender(log4js.appenders.file('/logs/WeatherIndex.log'), 'WeatherIndex')
var logger = log4js.getLogger('WeatherIndex')
logger.setLevel('INFO')
// logs

// set up smtp service
var transporter = nodemailer.createTransport(smtpTransport({
  host: 'mail.smtp2go.com',
  port: 465,
  auth: {
    user: 'rogerliuray@gmail.com',
    pass: 'KpkNPnfTDPGY'
  }
}))
transporter.verify(function (error, success) {
  if (error) {
    logger.error('transporter error: ' + error)
    // console.log(error)
  } else {
    // console.log('Server is ready to take our messages')
    logger.info('Server is ready to take our messages')
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send(true)
  res.render('signinup', { title: 'Express' })
})

router.get('/hack', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/checkEmail', function (req, res) {
  // search for user
  db.user.findOne({
    email: req.body.email
  }, function (err, doc) {
    if (doc) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

router.get('/activation', function (req, res, next) {
  // console.log('token ', req.query.token)
  var token = req.query.token

  // search for user
  // db.user.findOne({
  //   secretToken: token
  // }, function (err, doc) {
  //   if (doc) {
  //     console.log('user found ', doc)
  //     console.log('user activation')
  //   }
  // })
  db.user.findAndModify({
    query: { secretToken: token },
    update: { $set: { activated: true } },
    new: false
  }, function (err, doc, lastErrorObject) {
    if (err) {
      logger.error('user activation error: ' + err)

      // console.log(err)
    }
    if (doc) {
      logger.info('activation success ', doc)
      // console.log('activation success ', doc)
      req.session.user = {firstName: doc.firstName, lastName: doc.lastName, email: doc.email, authenticated: true}
      // res.render('index', {firstName: doc.firstName, lastName: doc.lastName, email: doc.email})
      res.redirect('/user')
    }
  })
})

router.post('/login', function (req, res) {
    // 200 OK
  res.status(200)
  console.log('POST - localhost:3000/login')
    // //only search by id.
  var data = req.body
    // Query Body
  db.user.findOne(data, function (err, doc) {
    if (err) {
      logger.error('login error: ' + err)
      // console.log(err)
      // res.redirect('/')
    }
    if (doc) {
      // login success
      req.session.user = {firstName: doc.firstName, lastName: doc.lastName, email: doc.email, authenticated: true}
      res.redirect('/user')
    } else {
      res.send(false)
    }
  })
})

// router.get('/signup', function (req, res) {
router.post('/signup', function (req, res) {
  // new token
  var token = crypto.randomBytes(64).toString('hex')

  // insert user into db

  var user = req.body
  // var user = {firstName: 'rui', lastName: 'liu', pwd: '123', email: 'rogerliuray@gmail.com'}
  db.user.insert({
    firstName: user.firstName,
    lastName: user.lastName,
    pwd: user.pwd,
    email: user.email,
    activated: false,
    secretToken: token,
    cities: []
  }, {
    continueOnError: true,
    safe: true
  }, function (err, docs) {
    if (err) {
      logger.error('user signup error: ' + err)
      // console.log('err')
    }
  })
// smtp send email
  transporter.sendMail({
    from: 'weatherapp@polarbeartech.com',
    to: user.email,
    subject: 'Welcome to WeatherApp',
    text: 'Please click the activation link: ' + deployAddress + '?token=' + token
  }, function (error, response) {
    if (error) {
      logger.error('user signup send email error: ' + error)
      // console.log(error)
    } else {
      logger.info('Message sent')
      // console.log('Message sent')
    }
  })
})

router.post('/today', function (req, res) {
  let now = new Date()
    // date, string 'YYYY-MM-DD'.
  let requestedTime = now.toISOString().substr(0, 10)

  forecast
    .latitude(req.body.lat)            // required: latitude, string.
    .longitude(req.body.lng)          // required: longitude, string.
//    .time(requestedTime)             // optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    // optional: units, string, refer to API documentation.
    .language('en')                 // optional: language, string, refer to API documentation.
    .exclude('')      // optional: exclude, string, refer to API documentation.
    .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
    .get()                          // execute your get request.
    .then(weather => {                  // handle your success response.
      res.send(weather)
      // console.log(weather)
    })
    .catch(err => {                 // handle your error response.
      logger.error('/today error: ' + err)
      // console.log(err)
    })
})
module.exports = router
