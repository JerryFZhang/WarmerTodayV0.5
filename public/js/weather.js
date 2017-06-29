$.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", {}, function (data) {
    console.log(data)
    let lat, lng;
    lat = parseFloat(JSON.stringify(data.location.lat));
    lng = parseFloat(JSON.stringify(data.location.lng));
    $("p.location").replaceWith('');
    getWeather(lat, lng);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", function (data) {
        var locationHTML = '<span style="font-size:3.5vw;">' + data.results[0].address_components[3].long_name + ", " + data.results[0].address_components[5].long_name + '</span><br/>';
        $("span.location2").replaceWith(locationHTML);
        // var results = data.results;
    });
});

function roundTemp(data) {
    console.log(data);
    return data.toFixed(0);
}
function parseHourlyData(data) {
    var hourlyDataToCel = [];
    // Extract hourly tempurature and stored in an array
    for (var i = 0; i < data.length; i++) {
        var time = data[i].time;
        var date = new Date(time * 1000);
        var temp = parseFloat(data[i].apparentTemperature)
        hourlyDataToCel[i] = temp;
    };
    //    console.log(hourlyDataToCel);
    return hourlyDataToCel;
}

function getWeather(lat, lng) {
    var currentHourlyData = [];
    console.log(lat);
    console.log(lng);
    $.post('/today', {
            lat: lat
            , lng: lng
        }, function (data) {
            currentHourlyData = data.hourly.data;
            console.log(data)
            console.log(data.daily.data[0].summary)
            console.log(data.daily.data[0].summary)
                //        Print extremas
                console.log(data.daily.data[0].summary.temperatureMax+ ' is current high ' + data.daily.data[0].summary.temperatureMin + 'is current low.');
                //Delete the warning message, replace with currentn wather information.
                $("p.inner").replaceWith('<h2 style="float: right;  font-size: 3.5vw;">' + roundTemp(data.currently.temperature) + ' Cº' + '<br style="clear:both" />' + '<p style="float: right;  font-size: 2vw;">' + 'H: ' + roundTemp(data.daily.data[0].temperatureMax) + ' Cº ' + 'L: ' + roundTemp(data.daily.data[0].temperatureMin)+ ' Cº</p>' + '<br/>'); $("span.sum").replaceWith('<span style="font-weight: normal; font-size: 3.5vw;">' + data.currently.summary + '</span>');
            });
    }
