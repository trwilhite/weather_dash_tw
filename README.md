# Server-Side APIs Challenge: Weather Dashboard

## User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Description
For this project, there was no starter code. The entire dashboard was built from scratch. This is a functional Weather Dashboard that uses two different OneWeather APIs to fetch weather data from cities that are searched. The first API is the Current Weather API, which provides current weather information for the searched city. The second API is the OneCall API, which fetches the UVI and 5-day forecast data from the searched city, but by using latitude and longitude as opposed to the city name. Up to 8 recent searches can be saved to local storage and displayed as function search buttons, allowing the user to access their 8 most recent searches simply by the click of a button. When you search a city, it will display the current date, weather icon, temperature, wind speed, humidity, and UVI in the current weather section. Then underneath that is the 5-day Forecast which shows the date, weather icon, temperature, wind speed, and humidity for the 5 days ahead.

## Built With
* HTML
* CSS / Boostrap
* JavaScript / JQuery

## Website
https://trwilhite.github.io/weather_dash_tw/

## Screenshot
![Screenshot](./assets/screenshot.png?raw=true "Screenshot")

## Contribution
Made with ❤️️ by Tamara Wilhite
