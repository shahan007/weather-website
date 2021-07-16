let updateMessage = () => {
    $('div:nth-of-type(2)').empty()
    let messaglist = [
        'Country',
        'Current Temp',
        'Minimun Temp',
        'Maximum Temp',
        'Feels like',
        'Humidity', 'Clouds are'
    ]
    messaglist.forEach(msg => {
        $('div:nth-of-type(2)').append(`<p>${msg}: <span></span></p>`);
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
        if ($('div:nth-of-type(2) > p').length === 1){
            updateMessage()
        }
        data = data.data;        
        let temp = data.main;        
        $('div:nth-of-type(2) > p:nth-of-type(1) > span').text(country.value);
        $('div:nth-of-type(2) > p:nth-of-type(2) > span').text(temp.temp);
        $('div:nth-of-type(2) > p:nth-of-type(3) > span').text(temp.temp_min);
        $('div:nth-of-type(2) > p:nth-of-type(4) > span').text(temp.temp_max);
        $('div:nth-of-type(2) > p:nth-of-type(5) > span').text(temp.feels_like);
        $('div:nth-of-type(2) > p:nth-of-type(6) > span').text(temp.humidity);
        $('div:nth-of-type(2) > p:nth-of-type(7) > span').text(data.weather[0].description);
    }).fail(function (error) { 
        let msg = error.responseJSON;
        $('.redmessage').text(msg.message);
    })
}
$('button').on('click',updateWeather);