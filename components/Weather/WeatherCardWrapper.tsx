"use client";
import WeatherCard from "./WeatherCard";
import WeatherCardAdd from "./WeatherCardAdd";
import { useCallback, useEffect, useReducer, useState } from "react";

// A function that converts a date with “YYYY-MM-DDTHH:mm:ssZ” format to date with “dddd MM/DD/YYYY” format
const getDateFormat = (date: string) => {
  let dateObj = new Date(date);

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the weekday name from the array
  let weekday = weekdays[dateObj.getDay()];

  // Get the month, day and year from the date object
  let month: string | number = dateObj.getMonth() + 1; // Add 1 because months are zero-based
  let day: string | number = dateObj.getDate();
  let year = dateObj.getFullYear();

  // Pad the month and day with leading zeros if they are single digits
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return weekday + " " + month + "/" + day + "/" + year;
};
// A function that maps the weather code to the corresponding weather description
function getWeatherCodeDescription(code: number | string) {
  switch (String(code)) {
    case "1000":
      return "Clear, Sunny";
    case "1100":
      return "Mostly Clear";
    case "1101":
      return "Partly Cloudy";
    case "1102":
      return "Mostly Cloudy";
    case "1001":
      return "Cloudy";
    case "2000":
      return "Fog";
    case "2100":
      return "Light Fog";
    case "4000":
      return "Drizzle";
    case "4001":
      return "Rain";
    case "4200":
      return "Light Rain";
    case "4201":
      return "Heavy Rain";
    case "5000":
      return "Snow";
    case "5001":
      return "Flurries";
    case "5100":
      return "Light Snow";
    case "5101":
      return "Heavy Snow";
    case "6000":
      return "Freezing Drizzle";
    case "6001":
      return "Freezing Rain";
    case "6200":
      return "Light Freezing Rain";
    case "6201":
      return "Heavy Freezing Rain";
    case "7000":
      return "Ice Pellets";
    case "7101":
      return "Heavy Ice Pellets";
    case "7102":
      return "Light Ice Pellets";
    case "8000":
      return "Thunderstorm";
    case "0":
    default:
      return "Unknown";
  }
}
const citiesReducer = (state, action) => {
  if (action.type === "SET") return action.cities;
  if (action.type === "ADD") return [...state, action.city];
  if (action.type === "DELETE") return [...state].splice(action.index, 1);
};
export default async function WeatherCardWrapper() {
  console.log('WeatherCardWrapper');
  
  const [cities, dispatch] = useReducer(citiesReducer, []);
  const [selectedCity, setSelectedCity] = useState(null);

  const onCitySelect = useCallback((city) => {
    console.log("city", city);
    setSelectedCity(city);
  }, []);

  const removeCity = useCallback((index) => {
    dispatch({ type: "DELETE", index });
  }, []);

  useEffect(() => {
    const city = selectedCity || "paris";
    fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${city}&timesteps=1d&apikey=tQJElj20QSULiaRiBukhKZW8yQC0nLkj`,
      { method: "GET", headers: { accept: "application/json" } }
    )
      .then((res) => res.json())
      .then((data) => {
        data.timelines.daily = data.timelines.daily.map((item) => {
          return {
            time: getDateFormat(item.time),
            values: {
              humidityAvg: Math.trunc(item.values.humidityAvg),
              temperatureApparentAvg: Math.trunc(
                item.values.temperatureApparentAvg
              ),
              temperatureAvg: Math.trunc(item.values.temperatureAvg),
              visibilityAvg: Math.trunc(item.values.visibilityAvg),
              windSpeedAvg: Math.trunc(item.values.windSpeedAvg),
              weatherCodeMax: getWeatherCodeDescription(
                item.values.weatherCodeMax
              ),
            },
          };
        });
        console.log("data", data);
        dispatch({ type: "ADD", city: data });
      })
      .catch(() => {
        console.log("error");
        dispatch({ type: "SET", cities: [] });
        console.log("cities", cities);
      });
  }, [selectedCity]);

  return (
    <div className="flex">
      {cities.length === 0 ? (
        <div className="text-white/70">
          Sorry, Weather data is not available at the moment!
        </div>
      ) : (
        cities.map((city, index: number) => (
          <WeatherCard
          index={index}
            key={`WeatherCard${index}`}
            weatherInfo={city.timelines.daily[0]}
            locationInfo={city.location}
            onRemoveCity={() => {
              removeCity(index);
            }}
          />
        ))
      )}
      {cities.length > 0 && cities.length < 3 ? (
        <WeatherCardAdd onCitySelect={onCitySelect} />
      ) : null}
    </div>
  );
}
