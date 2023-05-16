// A function that maps the weather code to the corresponding weather description
export const getWeatherFormat = (code: number | string) => {
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
};
// A function that maps the weather code to the corresponding weather icon
export const getIconName = (code: string | number) => {
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
};
