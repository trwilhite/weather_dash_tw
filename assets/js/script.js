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
                displayCurrent(data, city);
                uviForecast(data.coord.lat, data.coord.lon);
            });
        } else {
            alert("City Not Found. Please Search a Valid City Name.")
        }
    });
};

function uviForecast (lat, lon) {
    //format oneweather one call api url
    var onecallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=c12650a5a26dc020183a9dff69826eed";

    // make a get request to url
    fetch(onecallApi)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayUviForecast(data);
            });
        } else {
            alert("City Not Found. Please Search a Valid City Name.")
        }
        
    });
};

function displayCurrent (data, cityInput) {
    $("#cityName").text(cityInput + " (" + new Date().toLocaleDateString() + ")");
    $("#icon").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    $("#temp").text(data.main.temp);
    $("#wind").text(data.wind.speed);
    $("#humidity").text(data.main.humidity);
};

function displayUviForecast (data) {
    $("#uvi").text(data.current.uvi);
    if (data.current.uvi <= 2) {
        $("#uvi").addClass("bg-success");
    } else if (data.current.uvi <= 7) {
        $("#uvi").addClass("bg-warning");
    } else {
        $("#uvi").addClass("bg-danger");
    };

    for (let i = 1; i <= 5; i++) {
        var forecastDate = data.daily[i].dt * 1000;
        $("#day-" + i).text(new Date(forecastDate).toLocaleDateString());
        $("#iconDay-" + i).attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather.icon + ".png");
        $("#tempDay-" + i).text(data.daily[i].temp.day);
        $("#windDay-" + i).text(data.daily[i].wind_speed);
        $("#humidityDay-" + i).text(data.daily[i].humidity);
    }
}


$("#searchBtn").on("click", searchCity);