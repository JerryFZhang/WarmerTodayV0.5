// graph 2
// testing
var weather2 = [{
        time: 255589200
        , temperatureMax: 0
        , temperatureMin: -20
        , icon: 'rain'
  }, {
        time: 255589200
        , temperatureMax: 30
        , temperatureMin: 15
        , icon: 'cloudy'
  }, {
        time: 255589200
        , temperatureMax: 10
        , temperatureMin: -20
        , icon: 'snow'
  }, {
        time: 255589200
        , temperatureMax: 20
        , temperatureMin: -40
        , icon: 'wind'
  }, {
        time: 255589200
        , temperatureMax: 40
        , temperatureMin: -50
        , icon: 'clear-day'
  }]
    /*
    unit can be "c" "C" "f" "F"
    */
function renderingDayInfo(weather, unit) {
    var celsius = '&#8451;'
    var fahrenheit = '&#8457;'
    var tunit = celsius
    if (unit === 'c' || unit === 'C') {
        tunit = celsius
    }
    if (unit === 'f' || unit === 'F') {
        tunit = fahrenheit
    }
    // calculate average temp
    var min = weather[0].temperatureMin
    var max = weather[0].temperatureMax
    for (let x of weather) {
        if (x.temperatureMin < min) {
            min = x.temperatureMin
        }
        if (x.temperatureMax > max) {
            max = x.temperatureMax
        }
    }
    var dif = max - min
    var width0 = 0.00
    var width1 = 0.00
    var date
    var iconFileAddress
    for (var i = 0; i < weather.length; i++) {
        // var i = 1
        width0 = (weather[i].temperatureMin - min) / dif * 47
        width1 = (weather[i].temperatureMax - min) / dif * 100
        date = processDate(weather[i].time)
        iconFileAddress = processIcon(weather[i].icon)
            // $('#compare').append('<div class="container"><div class="row"><div class="col"><div>' + date[0].toUpperCase() + '</div><div>' +
            //   date[2] + '</div></div><div class="col"><img src="SVG/' + iconFileAddress + '.svg" width="80" height="60" color="white"></img></div><div class="barPadding row" style="padding-left: ' + width0 + 'px;"><span>' +
            //   weather[i].temperatureMin + tunit + '</span><p class="bar" style="width: ' + width1 + 'px;"></p><span>' + weather[i].temperatureMax + tunit + '</span></div></div></div>')
        $('#compare').append(' <div class="container"><div class="col-xs-6 col-sm-2 col-md-2" style="padding-top: 9px;"><div>' + date[0].toUpperCase() + '</div><div>' + date[2] + '</div></div><div class="col-xs-6 col-sm-2 col-md-2"><img src="SVG/' + iconFileAddress + '.svg" width="80" height="60" color="white"></div><div class="col-xs-3 col-sm-1 col-md-1" style="padding-top: 18px;"><span>' + roundTemp(weather[i].temperatureMin) + tunit + '</span></div><div class="col-xs-6 col-sm-4 col-md-6" style="padding-top: 18px; padding-left:' + width0 + '%;"><p class="bar" style="width:' + width1 + '%"></p></div><div class="col-xs-3 col-sm-1 col-md-1" style="padding-top: 18px;"><span>' + roundTemp(weather[i].temperatureMax) + tunit + '</span></div></div>')
    }
}

function processDate(dateString) {
    var d = new Date(dateString * 1000)
    var n = d.toString()
    var res = n.split(' ')
    return res
}

function processIcon(icon) {
    switch (icon) {
    case 'snow':
        return 'Cloud-Snow'
        break
    case 'clear-day':
        return 'Sun'
        break
    case 'clear-night':
        return 'Moon'
        break
    case 'partly-cloudy-day':
        return 'Cloud-Sun'
        break
    case 'partly-cloudy-night':
        return 'Cloud-Moon'
        break
    case 'cloudy':
        return 'Cloud'
        break
    case 'rain':
        return 'Cloud-Rain'
        break
    case 'sleet':
        return 'Cloud-Snow'
        break
    case 'wind':
        return 'Wind'
        break
    case 'fog':
        return 'Cloud-Fog'
        break
    default:
        return 'Sun'
    }
}
// testing
// renderingDayInfo(weather2, 'c')
// graph 2
// graph 1
// dynamically set skycons by class name
var list = [
    'clear-day', 'clear-night', 'partly-cloudy-day'
    , 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind'
    , 'fog'
  ]
    // dynamically set skycons by class name
    // functions that adding hour info
    // testing
var weather = [{
    temperature: 0
    , icon: 'rain'
  }, {
    temperature: 10
    , icon: 'cloudy'
  }, {
    temperature: 20
    , icon: 'snow'
  }, {
    temperature: 30
    , icon: 'wind'
  }, {
    temperature: 25
    , icon: 'clear-day'
  }]
for (var a = 0; a < 24; a++) {
    var temp = Math.floor(Math.random() * (40 - (-40) + 1)) - 40
    var index = Math.floor(Math.random() * (9 - 0 + 1)) + 0
    weather.push({
        temperature: temp
        , icon: list[index]
    })
}
// testing
/*
unit can be "c" "C" "f" "F"
*/
function renderingHourInfo(weather, unit) {
    var celsius = '&#8451;'
    var fahrenheit = '&#8457;'
    var tunit = celsius
    if (unit === 'c' || unit === 'C') {
        tunit = celsius
    }
    if (unit === 'f' || unit === 'F') {
        tunit = fahrenheit
    }
    // calculate average temp
    var sum = 0
    var min = weather[0].temperature
    var max = weather[0].temperature
    for (let x of weather) {
        if (x.temperature < min) {
            min = x.temperature
        }
        if (x.temperature > max) {
            max = x.temperature
        }
        sum += x.temperature
    }
    var avg = sum / 24
    var height = 0.00
    for (var i = 0; i < weather.length; i++) {
        // console.log(i)
        // console.log(weather[i])
        height = (1 - (weather[i].temperature - min) / (max - min)) * 200
        if (i % 24 < 12) {
            $('#forecastDay').append('<div class="col-xs-4"><div class="row">' + (i + 1) % 12 + 'AM</div><div class="row" style="padding-top:' + height + 'px"><canvas class="' + weather[i].icon + '" width="50" height="50"></canvas></div><div class="row">' + roundTemp(weather[i].temperature) + '' + tunit + '</div></div><!---->')
        }
        else {
            $('#forecastDay').append('<div class="col-xs-4"><div class="row">' + (i + 1 - 12) % 12 + 'PM</div><div class="row" style="padding-top:' + height + 'px"><canvas class="' + weather[i].icon + '" width="50" height="50"></canvas></div><div class="row">' + roundTemp(weather[i].temperature) + '' + tunit + '</div></div><!---->')
        }
    }
    var icons = new Skycons({
            'color': 'black'
        })
        , list = [
        'clear-day', 'clear-night', 'partly-cloudy-day'
        , 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind'
        , 'fog'
      ]
        , i
    for (i = list.length; i--;) {
        var weatherType = list[i]
            , elements = document.getElementsByClassName(weatherType)
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType)
        }
    }
    icons.play()
}
// renderingHourInfo(weather, 'f')
// functions that adding hour info
// graph 1
var currentHourlyData, currentDayData

function roundTemp(data) {
    // console.log(data)
    return data.toFixed(0)
}

function reload(lat, lng, unit) {
    $('#forecastDay').empty()
    $('#compare').empty()
    $.post('/today', {
        lat: lat
        , lng: lng
    }, function (data) {
        currentHourlyData = data.hourly.data
        currentDayData = data.daily.data
        renderingHourInfo(currentHourlyData, unit)
        renderingDayInfo(currentDayData, unit)
        $('span.inner').replaceWith('<span class="inner"><h3 style="text-align:right"><span>' + roundTemp(data.currently.temperature) + ' Cº</span></h3><h5 style="text-align:right">' + 'H: ' + roundTemp(data.daily.data[0].temperatureMax) + ' Cº ' + 'L: ' + roundTemp(data.daily.data[0].temperatureMin) + ' Cº</h5></span>');
        $('span.sum').replaceWith('<span class="sum"><h5>' + data.currently.summary + '</h5></span>');
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE', function (data2) {
            console.log(data2.results[4].formatted_address);
            console.log(data2);
            //            var short = data2.results[0];
            //            for (var i = 1; i< data2.results.length; i++){
            //                if (data2.results[i].formatted_address.length>)
            //                console.log(data2.results[i]);
            //                
            //            }
            $('span.location2').replaceWith('<span class="location2"><h3>' + data2.results[4].formatted_address + '</h3></span>')
                // var results = data.results;
        })
    })
}