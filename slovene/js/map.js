// www.Leaflet.com plugin
// Made with some help from MrXsquared on Stackexchange
// https://gis.stackexchange.com/a/313470

// Map

var map = L.map('map', {
    center: [45.58, 13.74], // Location of the map when page reloads (Ankaran, Slovenija)
    minZoom: 3, // The minimum zoom level down to which this layer will be displayed (inclusive).
    detectRetina: true, // it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
    updateWhenZooming: true,
    zoom: 7, // Map zoom when page reloads
    zoomControl: true, // Whether a zoom control is added to the map
});

//BASEMAPS

// Map layer from OpenStreetMap
var openStreetMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="https://osm.org/copyright" target = "_blank">OpenStreetMap</a>' // Copyright on bottom right corner
}).addTo(map);

// Popup
var popup = L.popup({
    className: 'customPopup', // custom popup class name
    keepInView: true // prevent users from panning the popup off of the screen while it is open.
});

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .openOn(map);

    // Getting json API from OpenWeatherMap
    $(document).ready(function(){
    $.ajax({

        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + e.latlng.lat + '&lon=' + e.latlng.lng + "&units=metric" + "&APPID=e8f4a198e35c9c4649ccbf95c524b37f" + "&lang=sl",
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
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

            //Popup with content
            popup.setContent(
                        '<h6 class="card-text"><u>' + (data.name).toUpperCase() + ', ' + data.sys.country + '</u></h6>' +
                        '<p class="small">Lon: ' + data.coord.lon + ', Lat: ' + data.coord.lat + '</p>' +
                        '<h2 style="font-size:50px;" class="card-text">' + Math.round(data.main.temp) + '&deg;C</h2>' +
                        '<p class="capitalize">' + "<img src='https://openweathermap.org/img/w/"+data.weather[0].icon+".png'>" + data.weather[0].description + '</p>' +
                        '<p><strong>Min temp: </strong>' + data.main.temp_min + '&deg;C / <strong>Max temp: </strong>' + data.main.temp_max + '&deg;C</p>' +
                        '<p><strong>Pritisk: </strong>' + data.main.pressure + ' hpa</p>' +
                        '<p><strong>Vlaga: </strong>' + data.main.humidity + ' %</p>' +
                        '<p><strong>Hitrost vetra: </strong>' + Math.round(windspeedkmh) + ' km/h</p>' +
                        '<p><strong>Smer vetra: </strong>' + winddirectionstring + ' / ' + winddirection + '&deg;</p>' +
                        '<p><strong>Oblačnost: </strong>' + data.clouds.all + ' %</p>'
            );
            

           
        }
    });  
});



}

//popup
map.on('click', onMapClick);
