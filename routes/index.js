var express = require('express')
var router = express.Router()
const DarkSky = require('dark-sky')
//https://www.npmjs.com/package/node-geocoder
var NodeGeocoder = require('node-geocoder')

// Use synchronous JavaScript call to fetch API id stored in forecast.txt.
// Use API id fetched from file system.
const forecast = new DarkSky('a663e12e77b9cfe68f9151767de5a597')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signinup', { title: 'Express' })
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
module.exports = router
