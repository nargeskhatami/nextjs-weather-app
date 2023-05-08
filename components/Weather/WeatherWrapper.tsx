import WeatherCard from "./WeatherCard";
import { Weather } from "../../types/Weather";
// A function that converts a date with “YYYY-MM-DDTHH:mm:ssZ” format to date with “dddd MM/DD/YYYY” format
const getDateFormat = (date: string) => {
  // Create a new Date object from the input string
  let dateObj = new Date(date);

  // Define an array of weekdays
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
    case "0":
      return "Unknown";
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
    default:
      return "Unknown";
  }
}
async function getWeatherInfo() {
  try {
    const res = await fetch(
      "https://api.tomorrow.io/v4/weather/forecast?location=newyork&timesteps=1d&apikey=tQJElj20QSULiaRiBukhKZW8yQC0nLkj",
      { method: "GET", headers: { accept: "application/json" } }
    );

    let data: Weather = await res.json();
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
          weatherCodeMax: getWeatherCodeDescription(item.values.weatherCodeMax),
        },
      };
    });
    return data;
  } catch {
    return null;
  }
}

export default async function WeatherWrapper() {
  const weatherInfo: Weather | null = await getWeatherInfo();
  const showWeather: boolean =
    weatherInfo !== null && weatherInfo.timelines.daily.length > 0;
  return (
    <>
      {showWeather ? (
        <WeatherCard
          weatherInfo={weatherInfo.timelines.daily[0]}
          locationInfo={weatherInfo.location}
        />
      ) : (
        <div className="bg-red-500/20 p-3 text-red-800 rounded border-l-4 border-red-800">
          Sorry, no weather data is available at the moment!
        </div>
      )}
    </>
  );
}
