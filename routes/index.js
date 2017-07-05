var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('local', ['users'])
const DarkSky = require('dark-sky')
// https://www.npmjs.com/package/node-geocoder
var NodeGeocoder = require('node-geocoder')
var sess
// Use synchronous JavaScript call to fetch API id stored in forecast.txt.
// Use API id fetched from file system.
const forecast = new DarkSky('a663e12e77b9cfe68f9151767de5a597')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/today', function (req, res) {
  let now = new Date()
    // date, string 'YYYY-MM-DD'.
  let requestedTime = now.toISOString().substr(0, 10)

  forecast
    .latitude(req.body.lat)            // required: latitude, string.
    .longitude(req.body.lng)          // required: longitude, string.
    .time(requestedTime)             // optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    // optional: units, string, refer to API documentation.
    .language('en')                 // optional: language, string, refer to API documentation.
    .exclude('')      // optional: exclude, string, refer to API documentation.
    .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
    .get()                          // execute your get request.
    .then(weather => {                  // handle your success response.
      res.send(weather)
      console.log(weather)
    })
    .catch(err => {                 // handle your error response.
      console.log(err)
    })
})

router.post('/login', function (req, res) {
    // 200 OK
  res.status(200)
  console.log('POST - localhost:3000/login')
        // Parse body
  console.log(req.body)
  var id = JSON.stringify(req.body.uname)
    // //only search by id.
  var data = '{' + '"id": ' + id + '}'
    // //Convert String to JSON
  data = JSON.parse(data)
    // Query Body
  db.user.find(data, function (err, records) {
    if (err) {
      console.log('Database Error' + err)
      res.send('Database Error' + err)
    } else {
            // No error, but no result returned
      if (records[0] === undefined) {
        console.log('User does not exist!')
        res.send('User does not exist!')
      } else {
                // Result returned, user exist.
        console.log('User found!')
        console.log(records[0])
        if (records[0].password === req.body.password) {
                    // Password matched.
          console.log('Password Matched, redirecting....')
          sess = req.session
          sess.userType = records[0].usertype
          sess.fname = records[0].firstname
          sess.email = records[0].email
          sess.user_id = records[0].id
          res.render('user', { title: 'Express' })
        } else {
          console.log('Wrong Password!')
          res.send('Wrong Password!')
        }
      }
    }
  })
})
module.exports = router
