let updateMessage = () => {
    $('#weather-data').empty()
    let messaglist = [
        'Country',
        'Current Temp',
        'Minimun Temp',
        'Maximum Temp',
        'Feels like',
        'Humidity', 'Clouds are'
    ]
    messaglist.forEach(msg => {
        $('#weather-data').append(`<p>${msg}: <span></span></p>`);
    })
}
let updateWeather = ()=>{
    let country = document.getElementById('country');     
    $.ajax({
        type: "POST",
        url: "/updateweather",
        data: JSON.stringify({ 'country': country.value}),
        dataType: "json",
        contentType:'application/json'
    }).done(function (data) { 
        $('.redmessage').text('');
        if ($('#weather-data > p').length === 1){
            updateMessage()
        }
        data = data.data;        
        let temp = data.main;        
        $('#weather-data > p:nth-of-type(1) > span').text(country.value);
        $('#weather-data > p:nth-of-type(2) > span').text(temp.temp);
        $('#weather-data > p:nth-of-type(3) > span').text(temp.temp_min);
        $('#weather-data > p:nth-of-type(4) > span').text(temp.temp_max);
        $('#weather-data > p:nth-of-type(5) > span').text(temp.feels_like);
        $('#weather-data > p:nth-of-type(6) > span').text(temp.humidity);
        $('#weather-data > p:nth-of-type(7) > span').text(data.weather[0].description);
    }).fail(function (error) { 
        let msg = error.responseJSON;
        $('.redmessage').text(msg.message);
    })
}

$('button').on('click',updateWeather);