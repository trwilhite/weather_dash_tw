function searchCity () {
    var cityInput = document.getElementById("cityInput").value.trim();
    console.log(cityInput);
    currentWeather(cityInput);
}

function currentWeather(city) {
    // format the openweather current weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c12650a5a26dc020183a9dff69826eed";
  
    // make a get request to url
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                uviForecast(data.coord.lat, data.coord.lon);
            });
        } else {
            alert("City Not Found. Please Search a Valid City Name.")
        }
        
    });
};

function uviForecast (lat, lon) {
    var onecallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=c12650a5a26dc020183a9dff69826eed";

    // make a get request to url
    fetch(onecallApi)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("City Not Found. Please Search a Valid City Name.")
        }
        
    });
}

$("#searchBtn").on("click", searchCity);