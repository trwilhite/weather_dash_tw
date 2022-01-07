var currentContainerEl = document.getElementById("current");

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
            });
        } else {
            alert("City Not Found. Please Search a Valid City Name.")
        }
        
    });
}

function displayCurrent (cityInput) {
    // var iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    // var currentDate = data.dt * 1000;

    var currentContainer = $("<div></div>");
    var currentBody = $("<div></div>");
    var currentHeader = $("<h3></h3>").text("hello")
    // var currentTemp = $("<p></p>");
    // var currentWind = $("<p></p>");
    // var currentHumidity = $("<p></p>");
    // var currentUvi = $("<p></p>");

    $(currentContainer).attr("class", "card");
    $(currentBody).attr("class", "card-body");
    $(currentBody).attr("id", "currentBody");
    $(currentHeader).attr("class", "card-title");
    // $(currentTemp).attr("class", "card-text");
    // $(currentWind).attr("class", "card-text");
    // $(currentHumidity).attr("class", "card-text");
    // $(currentUvi).attr("class", "card-text");

    // $(currentHeader).text(cityInput, currentDate, iconUrl)

    currentContainer.append(currentBody);
    currentBody.append(currentHeader);
    currentContainerEl.append(currentContainer);
}

$("#searchBtn").on("click", searchCity);