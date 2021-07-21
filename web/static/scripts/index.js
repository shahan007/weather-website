$(function () {
    $('button').on('click', () => { updateWeather() });
    $('.close').click(errormsgFadeOut);
    $('p.notification').on('click', () => {
        $('.close').trigger('click');
        return false;
    });
    geoFindMe();
});

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let dateTimeAccess = () => {
    let dateAccessed = new Date();
    let minutes = dateAccessed.getMinutes() < 11 ? "0" + dateAccessed.getMinutes() : dateAccessed.getMinutes();    
    dateAccessed = weekday[dateAccessed.getDay()].toUpperCase() +
        " | " +
        months[dateAccessed.getMonth()].toUpperCase() +
        " " +
        dateAccessed.getDate() +
        " | " +
        dateAccessed.getHours() +
        ":" +
        minutes;
    $('#date-accessed').animate({ 'opacity': 0 }, 550, function () {        
        $(this).text(`Date Accessed: ${dateAccessed}`)
        $(this).animate({ 'opacity': 1 }, 550);   // with slideOut timing is 550 else with fading error is 500
    });    
}

let updateMessage = () => {
    $('#weather-data').empty()
    let tempMesglist = [        
        ['min-temp','Minimun Temp'],
        ['max-temp','Maximum Temp'],
        ['feel-temp','Feels like']
    ];
    $('#weather-data').append("<div class='box'></div>");
    $('.box').append("<div class='wave -one'></div>");
    $('.box').append("<div class='wave -two'></div>");
    $('.box').append("<div class='wave -three'></div>");
    $('.box').append("<div class='weathercon'><img src='' alt='weather icon based on current temperature' id='weather-icon'></div>");
    $('.box').append("<div class='info'></div>");
    $('.info').append('<h2 class="location"></h2>');
    $('.info').append("<p id='current-temp' class='temp'>Current Temp: <span></span></p>");
    tempMesglist.forEach(msg => {
        $('.info').append(`<p id="${msg[0]}">${msg[1]}: <span></span></p>`);
    })
    $('.info').append("<p id='humidity'>Humidity: <span></span></p>");
    $('.info').append("<p id='clouds-like'>Clouds are: <span></span></p>");
}

let updateWeather = (lon=null,lat=null)=>{
    let place = document.getElementById('place');
    $.ajax({
        type: "POST",
        url: "/updateweather",
        data: JSON.stringify({ 
            'place': place.value.trim().toLocaleLowerCase(),
            'longitude' : lon,
            'latitude':lat
        }),
        dataType: "json",
        contentType:'application/json'
    }).done(function (data) { 
        $('.close').trigger('click');
        if ($('#weather-data > p').length === 1){            
            updateMessage()
        }
        data = data.data;        
        if (lon && lat) {
            place.value = data.name;
        }
        let temp = data.main;      
        $('#weather-data').animate({ 'opacity': 0 }, 550, function () {            
            $(this).animate({ 'opacity': 1 }, 550);   // with slideOut timing is 550 else with fading error is 500            
            $('#weather-icon').attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            $('.location').text(place.value.trim()[0].toUpperCase() + place.value.trim().toLocaleLowerCase().slice(1));
            $('#current-temp > span').html(`${temp.temp}&deg;C`);
            $('#min-temp > span').html(`${temp.temp_min}&deg;C`);
            $('#max-temp > span').html(`${temp.temp_max}&deg;C`);
            $('#feel-temp > span').html(`${temp.feels_like}&deg;C`);
            $('#humidity > span').text(temp.humidity);
            $('#clouds-like > span').text(data.weather[0].description);
        });   
        dateTimeAccess();
    }).fail(function (error) { 
        if ($('.notification').css('display') === 'block'){
            $('.close').trigger('click');
            setTimeout(error=>{
                let msg = error.responseJSON;
                $('#errormessage').text(msg.message)
                $('.notification').slideDown(550); // or fadeIn
            }, 800, error)
        } else {
            let msg = error.responseJSON;
            $('#errormessage').text(msg.message)
            $('.notification').slideDown(550); //fadeIn
        }            
    })
}

function geoFindMe() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        updateWeather(longitude,latitude);
    }

    function error() {
        console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }    
}

let errormsgFadeOut = event=>{    
    let parent = event.currentTarget.parentElement;
    $(parent).slideUp(550);  //fadeOut
    setTimeout(() => {
        $('#errormessage').text('');
    }, 600);    
    return false;
}