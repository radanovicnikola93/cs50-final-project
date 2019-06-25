$(document).ready(function(){
    
    $("#submitSearch").click(function(){
        return getWeather();
    });
    
    
});

function getWeather(){
    var search = $("#search").val();
    
    if(search != ''){
        
        $.ajax({

            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + search + "&units=metric" + "&APPID=e8f4a198e35c9c4649ccbf95c524b37f" + "&lang=sl",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                var card = showResults(data);
                console.log(data)

                // Changing backgroundd on weather data. https://github.com/Zackazt/weather-tut/blob/master/script.js
                switch (data.weather[0].main) {
                    case 'Clear':
                        document.body.style.backgroundImage = "url('../../css/img/weather/clear.jpg')"; // https://unsplash.com/@williambout
                        break;
                    
                    case 'Clouds':
                        document.body.style.backgroundImage = "url('../../css/img/weather/cloudy.jpg')";  // https://unsplash.com/@karsten_wuerth
                        break;
            
                    case 'Rain':
                    case 'Drizzle':
                    case 'Mist':
                        document.body.style.backgroundImage = "url('../../css/img/weather/rainy.jpg')"; // https://unsplash.com/@kellysikkema
                        break;
                    
                    case 'Thunderstorm':
                        document.body.style.backgroundImage = "url('../../css/img/weather/storm.jpg')"; // https://unsplash.com/@o1234567890
                        break;
                    
                    case 'Snow':
                        document.body.style.backgroundImage = "url('../../css/img/weather/snowy.jpg')"; // https://unsplash.com/@aaronburden
                        break;
            
                    default:
                        break;
                }
                
                $("#titleFade").fadeOut(-3000);

                ($("#showWeather").html(card)).hide().fadeIn(1500);

                $("#search").val('');

            }
            
        });

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + search + "&units=metric" + "&APPID=c10bb3bd22f90d636baa008b1529ee25" + "&lang=sl",
            type: "GET",
            dataType: "jsonp",

            success: function(data){
                console.log(data)
                var card = '';
                
                for(var i = 1; i < data.list.length; i++){
                    
                    // storing json data in variables
                    windspeed = data.list[i].wind.speed // Meter per second
                    winddirection = data.list[i].wind.deg; // Wind from direction x degree from north
                    windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100; // Windspeed from m/s in km/h; Round to 2 decimals

                    winddirectionstring = "Im the wind from direction"; // Wind from direction as text
                    if (winddirection > 348.75 &&  winddirection <= 11.25) {
                        winddirectionstring =  "Sever - Tramontana";
                    } else if (winddirection > 11.25 &&  winddirection <= 33.75) {
                        winddirectionstring =  "Severosevervzhod - Burin";
                    } else if (winddirection > 33.75 &&  winddirection <= 56.25) {
                        winddirectionstring =  "Severovzhod - Burja";
                    } else if (winddirection > 56.25 &&  winddirection <= 78.75) {
                        winddirectionstring =  "Vzhodseverovzhod";
                    } else if (winddirection > 78.75 &&  winddirection <= 101.25) {
                        winddirectionstring =  "Vzhod - Levante";
                    } else if (winddirection > 101.25 &&  winddirection <= 123.75) {
                        winddirectionstring =  "Vzhodjugovzhod";
                    } else if (winddirection > 123.75 &&  winddirection <= 146.25) {
                        winddirectionstring =  "Jugovzhod - Jugo";
                    } else if (winddirection > 146.25 &&  winddirection <= 168.75) {
                        winddirectionstring =  "Jugojugovzhod";
                    } else if (winddirection > 168.75 &&  winddirection <= 191.25) {
                        winddirectionstring =  "Jug - Oštro";
                    } else if (winddirection > 191.25 &&  winddirection <= 213.75) {
                        winddirectionstring =  "Jugojugozahod";
                    } else if (winddirection > 213.75 &&  winddirection <= 236.25) {
                        winddirectionstring =  "Jugozahod - Lebič";
                    } else if (winddirection > 236.25 &&  winddirection <= 258.75) {
                        winddirectionstring =  "Zahodjugozahod";
                    } else if (winddirection > 258.75 &&  winddirection <= 281.25) {
                        winddirectionstring =  "Zahod - Ponente";
                    } else if (winddirection > 281.25 &&  winddirection <= 303.75) {
                        winddirectionstring =  "Zahodseverozahod";
                    } else if (winddirection > 303.75 &&  winddirection <= 326.25) {
                        winddirectionstring =  "Severozahod - Maestral";
                    } else if (winddirection > 326.25 &&  winddirection <= 348.75) {
                        winddirectionstring =  "Seversevedzahod";
                    } else {
                        winddirectionstring =  "Informacije o vetru niso znane";
                    };


                    // card
                    
                        card += '<div class="carousel-item">'
                        
                                    card += '<h6><u>' + data.list[i].dt_txt + '</u></h6>'
                                    card += '<h2 style="font-size:50px;">' + Math.round(data.list[i].main.temp) + '&deg;C</h2>'
                                    card += "<img src='https://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'>" + '<p class="capitalize">' + data.list[i].weather[0].description + '</p>'
                                    card += '<p>Min temp: ' + Math.round(data.list[i].main.temp_min) + '&deg;C / Max temp: ' + Math.round(data.list[i].main.temp_max) + '&deg;C</p>'
                                    card += '<p><strong>Pritisk: </strong>' + data.list[i].main.pressure + ' hpa</p>'
                                    card += '<p><strong>Vlaga: </strong>' + data.list[i].main.humidity + ' %</p>'
                                    card += '<p><strong>Hitrost vetra: </strong>' + Math.round(windspeedkmh) + ' km/h</p>'
                                    card += '<p><strong>Smer vetra: </strong>' + winddirectionstring + ' / ' + Math.round(winddirection) + '</p>'
                                    card += '<p><strong>Oblačnost: </strong>' + data.list[i].clouds.all + ' %</p>'
                                
                        card += '</div>'
                    
                }
                
                ($("#showHourly").html(card)).hide().fadeIn(1500);
                $("#carouselContent").hide().fadeIn(1500);
                
                $("#search").val('');
                
            }
            
            
        });
        
    }else{
        $("#error").html("<div class='alert alert-danger text-center'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Prosimo vnesite želeno mesto. Iskalnik ne more biti prazen.</div>");
    }
    
    
}

function showResults(data){
    // storing json data in variables
    windspeed = data.wind.speed; // Meter per second
    winddirection = data.wind.deg; // Wind from direction x degree from north
    windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100; // Windspeed from m/s in km/h; Round to 2 decimals

    winddirectionstring = "Im the wind from direction"; // Wind from direction as text
    if (winddirection > 348.75 &&  winddirection <= 11.25) {
        winddirectionstring =  "Sever - Tramontana";
    } else if (winddirection > 11.25 &&  winddirection <= 33.75) {
        winddirectionstring =  "Severosevervzhod - Burin";
    } else if (winddirection > 33.75 &&  winddirection <= 56.25) {
        winddirectionstring =  "Severovzhod - Burja";
    } else if (winddirection > 56.25 &&  winddirection <= 78.75) {
        winddirectionstring =  "Vzhodseverovzhod";
    } else if (winddirection > 78.75 &&  winddirection <= 101.25) {
        winddirectionstring =  "Vzhod - Levante";
    } else if (winddirection > 101.25 &&  winddirection <= 123.75) {
        winddirectionstring =  "Vzhodjugovzhod";
    } else if (winddirection > 123.75 &&  winddirection <= 146.25) {
        winddirectionstring =  "Jugovzhod - Jugo";
    } else if (winddirection > 146.25 &&  winddirection <= 168.75) {
        winddirectionstring =  "Jugojugovzhod";
    } else if (winddirection > 168.75 &&  winddirection <= 191.25) {
        winddirectionstring =  "Jug - Oštro";
    } else if (winddirection > 191.25 &&  winddirection <= 213.75) {
        winddirectionstring =  "Jugojugozahod";
    } else if (winddirection > 213.75 &&  winddirection <= 236.25) {
        winddirectionstring =  "Jugozahod - Lebič";
    } else if (winddirection > 236.25 &&  winddirection <= 258.75) {
        winddirectionstring =  "Zahodjugozahod";
    } else if (winddirection > 258.75 &&  winddirection <= 281.25) {
        winddirectionstring =  "Zahod - Ponente";
    } else if (winddirection > 281.25 &&  winddirection <= 303.75) {
        winddirectionstring =  "Zahodseverozahod";
    } else if (winddirection > 303.75 &&  winddirection <= 326.25) {
        winddirectionstring =  "Severozahod - Maestral";
    } else if (winddirection > 326.25 &&  winddirection <= 348.75) {
        winddirectionstring =  "Seversevedzahod";
    } else {
        winddirectionstring =  "Informacije o vetru niso znane";
    };

    return  '<div id="cardSpace">' +
                '<div class="card">' +
                    '<div class="card-body">' + 
                        '<h2 class="card-text"><u>' + (data.name).toUpperCase() + ', ' + data.sys.country + '</u></h2>' +
                        '<p class="card-text small">Lon: ' + data.coord.lon + ', Lat: ' + data.coord.lat + '</p>' +
                        '<h2 class="card-text" style="font-size:50px;" class="card-text">' + Math.round(data.main.temp) + '&deg;C</h2>' +
                        '<p class="card-text capitalize">' + "<img src='https://openweathermap.org/img/w/"+data.weather[0].icon+".png'>" + data.weather[0].description + '</p>' +
                        '<p class="card-text"><strong>Min temp: </strong>' + data.main.temp_min + '&deg;C / <strong>Max temp: </strong>' + data.main.temp_max + '&deg;C</p>' +
                        '<p class="card-text"><strong>Pritisk: </strong>' + data.main.pressure + ' hpa</p>' +
                        '<p class="card-text"><strong>Vlaga: </strong>' + data.main.humidity + ' %</p>' +
                        '<p><strong>Hitrost vetra: </strong>' + Math.round(windspeedkmh) + ' km/h</p>' +
                        '<p><strong>Smer vetra: </strong>' + winddirectionstring + ' / ' + Math.round(winddirection) + '&deg;</p>' +
                        '<p class="card-text"><strong>Oblačnost: </strong>' + data.clouds.all + ' %</p>' +
                    '</div>' +
                '</div>' +
            '</div>'
}