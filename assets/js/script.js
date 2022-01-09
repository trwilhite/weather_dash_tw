$(document).ready(function () {
    // defines the cityInput variable and calls for the current weather function to begin
    function searchCity () {
        var cityInput = document.getElementById("cityInput").value.trim();
        console.log(cityInput);
        currentWeather(cityInput);
    }

    function currentWeather(cityInput) {
        // format the openweather current weather api url
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=c12650a5a26dc020183a9dff69826eed&units=imperial";
    
        // make a get request to url
        fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    // if the response is OK then it will call the displayCurrent function, call the uviForecast function which fetches the OneCall API, and saves the search to local storage
                    displayCurrent(data, cityInput);
                    uviForecast(data.coord.lat, data.coord.lon);
                    saveSearches(cityInput);
                });
                // if the resopnse is not OK then it wil return an error to the user prompting them to try again
            } else {
                alert("City Not Found. Please Search a Valid City Name.")
            }
        });
    };

    function uviForecast (lat, lon) {
        //format oneweather one call api url
        var onecallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=c12650a5a26dc020183a9dff69826eed&units=imperial";

        // make a get request to url
        fetch(onecallApi)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    // calls the function to display the UVI and 5 day forecast
                    displayUviForecast(data);
                });
            } else {
                alert("City Not Found. Please Search a Valid City Name.")
            }
            
        });
    };

    function displayCurrent (data, cityInput) {
        // grabs the IDs for the html components within the current weather card and adds the appropriate information pulled from the API along with the date
        $("#cityName").text(cityInput + " (" + new Date().toLocaleDateString() + ")");
        $("#icon").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        $("#temp").text(data.main.temp);
        $("#wind").text(data.wind.speed);
        $("#humidity").text(data.main.humidity);
    };

    function displayUviForecast (data) {
        // sets classes for each UVI level based on the UV Index Scale from EPA.gov using bootstrap color classes
        $("#uvi").text(data.current.uvi);
        if (data.current.uvi <= 2) {
            // if UVI is less than or equal to 2, the background will be green
            $("#uvi").addClass("bg-success");
        } else if (data.current.uvi <= 7) {
            // if UVI is 3-7, backgrounf will be yellow
            $("#uvi").addClass("bg-warning");
        } else {
            // if UVI is above 7 it will be red
            $("#uvi").addClass("bg-danger");
        };

        for (let i = 1; i <= 5; i++) {
            // defines the variable to grab the date for each day in the 5-day forecast
            var forecastDate = data.daily[i].dt * 1000;

            // uses data attributes from html to display date, icon, temp, wind, and humidity for each day in the forecast dynamically
            $("#day-" + i).text(new Date(forecastDate).toLocaleDateString());
            $("#iconDay-" + i).attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
            $("#tempDay-" + i).text(data.daily[i].temp.day);
            $("#windDay-" + i).text(data.daily[i].wind_speed);
            $("#humidityDay-" + i).text(data.daily[i].humidity);
        }
    };

    function saveSearches(cityInput) {
        var recentSearches = JSON.parse(localStorage.getItem("city"));

        // if there are no recent searches saved in local storage, it will create an array
        if(recentSearches == null) {
            recentSearches = [];
            // adds new searches to the beginning of the array rather than the end
            recentSearches.unshift(cityInput);
            localStorage.setItem("city", JSON.stringify(recentSearches));
        }

        // if there are more than 8 items in the local storage array, it will 'pop', so there are only max 8 recent search buttons on page
        if(recentSearches > 7) {
            recentSearches.pop();
        }

        if(!recentSearches.includes(cityInput)) {
            recentSearches.unshift(cityInput);
            localStorage.setItem("city", JSON.stringify(recentSearches));
        }
    };

    function displaySearches() {
        var recentSearches = JSON.parse(localStorage.getItem("city"));

        if(recentSearches) {
            for (let i = 0; i < recentSearches.length; i++) {
                var recentBtn = $("<button>");
                recentBtn.attr("class", "btn btn-secondary");
                recentBtn.attr("type", "button");
                recentBtn.attr("value", recentSearches[i]);
                recentBtn.text(recentSearches[i]);
                $("#recentBtns").append(recentBtn);
            }
        }
        // $("#recentBtns").on(click, searchRecent());
    };

    function searchRecent() {
        var cityInput = this.value;
        currentWeather(cityInput);
    };

    $("#searchBtn").on("click", searchCity);

    displaySearches();
});