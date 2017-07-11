var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* log out */
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    } else {
      sess = undefined
      res.render('index')
    }
  })
})

router.post('/resetpwd', function (req, res, next) {
  db.user.findAndModify({
    query: { email: req.session.user.email },
    update: { $set: {pwd: req.body.pwd } },
    new: false
  }, function (err, doc, lastErrorObject) {
    if (err) {
      console.log(err)
    }
    if (doc) {
      console.log('activation success ', doc)
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
      console.log(err)
    }
    if (doc) {
      console.log('activation success ', doc)
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
      console.log('user found ', doc)
      res.send(doc.cities)
    }
  })
})
module.exports = router
