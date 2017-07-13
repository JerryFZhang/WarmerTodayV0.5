var express = require('express')
var router = express.Router()
// logs
const log4js = require('log4js')
log4js.loadAppender('file')
log4js.addAppender(log4js.appenders.file('/logs/WeatherUser.log'), 'WeatherUser')
var logger = log4js.getLogger('WeatherUser')
logger.setLevel('INFO')
// logs

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('user', { title: 'Express' })
})

/* log out */
router.get('/logout', function (req, res) {
    console.log("logging out");
  req.session.destroy(function (err) {
    if (err) {
                console.log("heere")
      logger.error('logout: ' + err)
    } else {
        console.log("ljdiusjduaoudjsoa")
      sess = undefined
  res.render('index', { title: 'Express' })
    }
  })
    res.redirect('/');
})

router.post('/resetpwd', function (req, res, next) {
  db.user.findAndModify({
    query: { email: req.session.user.email },
    update: { $set: {pwd: req.body.pwd } },
    new: false
  }, function (err, doc, lastErrorObject) {
    if (err) {
      logger.error('resetpwd: ' + err)
    }
    if (doc) {
      logger.info('reset success: ' + err)
      req.session.user = {firstName: doc.firstName, lastName: doc.lastName, email: doc.email, authenticated: true}
      // res.render('index', {firstName: doc.firstName, lastName: doc.lastName, email: doc.email})
      res.redirect('/user')
    }
  })
})
router.post('/resetusername', function (req, res, next) {
  db.user.findAndModify({
    query: { email: req.session.user.email },
    update: { $set: { firstName: req.body.firstName, lastName: req.body.lastName} },
    new: false
  }, function (err, doc, lastErrorObject) {
    if (err) {
      logger.error('resetusername: ' + err)
    }
    if (doc) {
      logger.info('resetusername: success ')
      req.session.user = {firstName: doc.firstName, lastName: doc.lastName, email: doc.email, authenticated: true}
      // res.render('index', {firstName: doc.firstName, lastName: doc.lastName, email: doc.email})
      res.redirect('/user')
    }
  })
})

router.get('/usercities', function (req, res, next) {
  db.user.findOne({
    email: req.session.user.email
  }, function (err, doc) {
    if (doc) {
      logger.info('user found ', doc)
      res.send(doc.cities)
    }
  })
})
module.exports = router
