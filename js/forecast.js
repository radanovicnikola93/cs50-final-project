$(document).ready(function(){
    
    $("#submitSearch").click(function(){
        return getForecast();
    });
    
});

function getForecast(){
    var  search= $("#search").val();
    var days = $("#days").val();
    
    if(search != '' && days != ''){
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + search + "&units=metric" + "&cnt=" + days + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                
                var card = '';
                
                var header = '<h1 style="font-size: 50px;" class="text-center">'+(data.city.name).toUpperCase()+', '+data.city.country+'</h1>' +
                "<p class='text-center' style='font-size:10px; margin-top: 10px;'>Longitude: "+data.city.coord.lon+", Latitude: "+data.city.coord.lat+"</p>";
                
                for(var i = 1; i < data.list.length; i++){
                    // returning local date 
                    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var date = new Date()
                    var newdate = new Date(date);

                    newdate.setDate(newdate.getDate() + i);
                    
                    var days = weekDays[newdate.getDay()]
                    var dd = newdate.getDate();
                    var mm = newdate.getMonth() + 1;
                    var y = newdate.getFullYear();

                    var someFormattedDate = days + ', ' + mm + '/' + dd + '/' + y;
                    
                    // storing json data in variables
                    windspeed = data.list[i].speed // Meter per second
                    winddirection = data.list[i].deg; // Wind from direction x degree from north
                    windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100; // Windspeed from m/s in km/h; Round to 2 decimals

                    winddirectionstring = "Im the wind from direction"; // Wind from direction as text
                    if (winddirection > 348.75 &&  winddirection <= 11.25) {
                        winddirectionstring =  "North";
                    } else if (winddirection > 11.25 &&  winddirection <= 33.75) {
                        winddirectionstring =  "Northnortheast";
                    } else if (winddirection > 33.75 &&  winddirection <= 56.25) {
                        winddirectionstring =  "Northeast";
                    } else if (winddirection > 56.25 &&  winddirection <= 78.75) {
                        winddirectionstring =  "Eastnortheast";
                    } else if (winddirection > 78.75 &&  winddirection <= 101.25) {
                        winddirectionstring =  "East";
                    } else if (winddirection > 101.25 &&  winddirection <= 123.75) {
                        winddirectionstring =  "Eastsoutheast";
                    } else if (winddirection > 123.75 &&  winddirection <= 146.25) {
                        winddirectionstring =  "Southeast";
                    } else if (winddirection > 146.25 &&  winddirection <= 168.75) {
                        winddirectionstring =  "Southsoutheast";
                    } else if (winddirection > 168.75 &&  winddirection <= 191.25) {
                        winddirectionstring =  "South";
                    } else if (winddirection > 191.25 &&  winddirection <= 213.75) {
                        winddirectionstring =  "Southsouthwest";
                    } else if (winddirection > 213.75 &&  winddirection <= 236.25) {
                        winddirectionstring =  "Southwest";
                    } else if (winddirection > 236.25 &&  winddirection <= 258.75) {
                        winddirectionstring =  "Westsouthwest";
                    } else if (winddirection > 258.75 &&  winddirection <= 281.25) {
                        winddirectionstring =  "West";
                    } else if (winddirection > 281.25 &&  winddirection <= 303.75) {
                        winddirectionstring =  "Westnorthwest";
                    } else if (winddirection > 303.75 &&  winddirection <= 326.25) {
                        winddirectionstring =  "Northwest";
                    } else if (winddirection > 326.25 &&  winddirection <= 348.75) {
                        winddirectionstring =  "Northnorthwest";
                    } else {
                        winddirectionstring =  "No wind data available";
                    };


                    // card
                    
                        card += '<div id="cardSpace" class="col-sm-4">';
                            card += '<div class="card">';
                                card += '<div class="card-body">';
                                    card += '<h6 class="card-text"><u>' + someFormattedDate + '</u></h6>';
                                    card += '<h2 style="font-size:50px;" class="card-text">' + Math.round(data.list[i].temp.day) + '&deg;C</h2>';
                                    card += "<img src='https://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'>" + '<p class="card-text capitalize">' + data.list[i].weather[0].description + '</p>';
                                    card += '<p class="card-text">Min temp: ' + Math.round(data.list[i].temp.min) + '&deg;C / Max temp: ' + Math.round(data.list[i].temp.max) + '&deg;C</p>';
                                    card += '<p class="card-text"><strong>Pressure: </strong>' + data.list[i].pressure + ' hpa</p>';
                                    card += '<p class="card-text"><strong>Humidity: </strong>' + data.list[i].humidity + ' %</p>';
                                    card += '<p class="card-text"><strong>Wind speed: </strong>' + Math.round(windspeedkmh) + ' km/h</p>';
                                    card += '<p class="card-text"><strong>Wind direction: </strong>' + winddirectionstring + ' / ' + winddirection + '</p>';
                                    card += '<p class="card-text"><strong>Cloudiness: </strong>' + data.list[i].clouds + ' %</p>';
                                card += '</div>';
                            card += '</div>';
                        card += '</div>';
                    
                }
                
                $("#titleFade").fadeOut(-3000);
                ($("#showTitle").html(header)).hide().fadeIn(1500);
                ($("#showForecast").html(card)).hide().fadeIn(1500);
                
                
                $("#search").val('');
                $("#days").val('')
                
            }
            
            
        });
        
    }else{
        $("#error").html("<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Search field cannot be empty</div>");
    }
    
}