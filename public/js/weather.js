var currentWeather
var unit = 'c'
$.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE', {}, function (data) {
    // console.log(data);
    let lat, lng
    lat = parseFloat(JSON.stringify(data.location.lat))
    lng = parseFloat(JSON.stringify(data.location.lng))
    $('span.location').replaceWith('')
    // getWeather(lat, lng)
    reload(lat,lng, unit)
    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE', function (data) {
        $('span.location2').replaceWith('<span class="location2"><h3>' + data.results[4].formatted_address + '</h3></span>')
    })
})

function roundTemp(data) {
    // console.log(data)
    return data.toFixed(0)
}

function parseHourlyData(data) {
    var hourlyDataToCel = []
        // Extract hourly tempurature and stored in an array
    for (var i = 0; i < data.length; i++) {
        var time = data[i].time
        var date = new Date(time * 1000)
        var temp = parseFloat(data[i].apparentTemperature)
        hourlyDataToCel[i] = temp
    };
    //    console.log(hourlyDataToCel);
    return hourlyDataToCel
}

function getWeather(lat, lng) {
    var currentHourlyData = []
        // console.log(lat)
        // console.log(lng)
    $.post('/today', {
        lat: lat
        , lng: lng
    }, function (data) {
        currentHourlyData = data.hourly.data
        console.log('data', data)
        currentWeather = data
            // console.log(data.daily.data[0].summary)
            // console.log(data.daily.data[0].summary)
            //             //        Print extremas
            // console.log(data.daily.data[0].summary.temperatureMax + ' is current high ' + data.daily.data[0].summary.temperatureMin + 'is current low.')
            // Delete the warning message, replace with currentn wather information.
        $('span.inner').replaceWith('<span class="inner"><h3 style="text-align:right"><span>' + roundTemp(data.currently.temperature) + ' Cº</span></h3><h5 style="text-align:right">' + 'H: ' + roundTemp(data.daily.data[0].temperatureMax) + ' Cº ' + 'L: ' + roundTemp(data.daily.data[0].temperatureMin) + ' Cº</h5></span>');
        $('span.sum').replaceWith('<span class="sum"><h5>' + data.currently.summary + '</h5></span>')
    })
}
// Sign In/Up
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this)
        , label = $this.prev('label')
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight')
        }
        else {
            label.addClass('active highlight')
        }
    }
    else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight')
        }
        else {
            label.removeClass('highlight')
        }
    }
    else if (e.type === 'focus') {
        if ($this.val() === '') {
            label.removeClass('highlight')
        }
        else if ($this.val() !== '') {
            label.addClass('highlight')
        }
    }
})
$('.tab a').on('click', function (e) {
        e.preventDefault()
        $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
        target = $(this).attr('href')
        $('.tab-content > div').not(target).hide()
        $(target).fadeIn(600)
    })
    // Sign In/Up
