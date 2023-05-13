"use client";

import { TrashIcon } from "@heroicons/react/24/solid";

// A function that returns any string including white space so that the first letter of each word is capital and the rest are small
const capitalizeWords = (str: string) => {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let firstLetter = words[i][0].toUpperCase();
    let restLetters = words[i].slice(1).toLowerCase();
    words[i] = firstLetter + restLetters;
  }
  return words.join(" ");
};
const metricValues = {
  temperature: "°C",
  apparentTemperature: "°",
  humidity: "%",
  windSpeed: "m/s",
  visibility: "km",
};
// A function that maps the weather code to the corresponding weather description
function getIconName(code: string) {
  switch (code) {
    case "Mostly Clear":
    case "Clear, Sunny":
      return "sunny";
    case "Partly Cloudy":
    case "Mostly Cloudy":
    case "Cloudy":
      return "partly-cloudy";
    case "Rain":
    case "Light Rain":
    case "Heavy Rain":
      return "rainy";
    case "Snow":
    case "Flurries":
    case "Light Snow":
    case "Heavy Snow":
      return "snowy";
    case "Thunderstorm":
      return "rain-thunder";
    case "Freezing Drizzle":
    case "Freezing Rain":
    case "Light Freezing Rain":
    case "Heavy Freezing Rain":
    case "Ice Pellets":
    case "Heavy Ice Pellets":
    case "Light Ice Pellets":
    case "Light Fog":
    case "Drizzle":
    case "Fog":
    default:
      return "";
  }
}
export default function WeatherCard({
  weatherInfo,
  locationInfo,
  onRemoveCity,
  index,
}) {
  return (
    <figure className="relative flex flex-col justify-between rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4 mx-2">
      {index > 0 && (
        <TrashIcon
          onClick={onRemoveCity}
          className="absolute h-[20px] right-5 text-white/80 cursor-pointer transition-all hover:text-white"
        />
      )}
      <div className="flex items-center text-white">
        <svg width={56} height={56}>
          <use
            href={`/sprite.svg#${getIconName(
              weatherInfo.values.weatherCodeMax
            )}`}
          />
        </svg>
        <div className="pl-2">
          <h2 className="font-semibold">
            {capitalizeWords(locationInfo.name.split(",")[0])}
          </h2>
          <span className="font-light">{weatherInfo.time}</span>
        </div>
      </div>
      <div className="flex flex-col text-white items-center justify-center">
        <span className="text-8xl relative">
          {weatherInfo.values.temperatureAvg}
          <span className="absolute text-sm font-light top-[6px]">
            {metricValues.temperature}
          </span>
        </span>
        <span>{weatherInfo.values.weatherCodeMax}</span>
      </div>
      <div>
        <div className="flex items-center justify-center text-white divide-x divide-solid divide-white/60 py-2">
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#visibility`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">
              Visibility
            </span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.visibilityAvg} {metricValues.visibility}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#apparent`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">
              Feels like
            </span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.temperatureApparentAvg}
              {metricValues.apparentTemperature}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center text-white divide-x divide-solid divide-white/60 py-2">
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#humidity`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">
              Humidity
            </span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.humidityAvg} {metricValues.humidity}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#wind`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">Wind</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.windSpeedAvg} {metricValues.windSpeed}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
