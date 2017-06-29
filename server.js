const express = require('express')
const DarkSky = require('dark-sky')

// Use synchronous JavaScript call to fetch API id stored in forecast.txt.
// Use API id fetched from file system.
const forecast = new DarkSky('a663e12e77b9cfe68f9151767de5a597')

var app = express();
var path = require('path');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');

// View engine setup
app.set('views', path.join(__dirname, 'views'));

// Parsing coming JSON object
app.use(bodyParser.urlencoded());

// Serving all public content only from ./public
app.use(express.static(path.join(__dirname, 'public')));

// Default landing page
app.get('/', function (req, res) {
    res.render('index');
});

// Serving today's weather.
app.post('/today', function (req, res) {
    let now = new Date();
    //date, string 'YYYY-MM-DD'.
    let requestedTime = now.toISOString().substr(0,10);

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
        res.send(weather);
        console.log(weather);
    })
    .catch(err => {                 // handle your error response.
        console.log(err)
    })

});

// Custom 404 page.
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// Custom 500 page.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

// Start the server
app.listen(4000, function () {
    console.log('Express started.');
});

function parseHourlyData(data){
   var temp = [];    
    for (var i = 0; i < data.length; i++) {
    temp[i] = data[i].temperature;    
    }
    return temp;
}

function getWeather(location, time, callback){
    console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
//    var abc = JSON.parse(location);
    console.log(location.body);
    console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    
    forecast
    .latitude('37.8267')            // required: latitude, string.
    .longitude('-122.423')          // required: longitude, string.
    .time('2016-01-28')             // optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    // optional: units, string, refer to API documentation.
    .language('en')                 // optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      // optional: exclude, string, refer to API documentation.
    .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
    .get()                          // execute your get request.
    .then(res => {                  // handle your success response.
        console.log(res)
    })
    .catch(err => {                 // handle your error response.
        console.log(err)
    })

//    var data = app.get('https://api.darksky.net/forecast/'+forecastIOID+'/'+location.lat, function (req, res){
        
//    });
//                      ).then(function (weather) {
//        callback(weather);
//    });
}