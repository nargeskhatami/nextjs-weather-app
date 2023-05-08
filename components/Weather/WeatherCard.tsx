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
export default function WeatherCard({ weatherInfo, locationInfo }) {
  return (
    <figure className="flex flex-col justify-between rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4">
      <div className="flex items-center text-white">
        <img src="/Sunny.svg" alt="Sunny" width={64} height={64} />
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
        <span className="">{weatherInfo.values.weatherCodeMax}</span>
      </div>
      <div>
        <div className="flex items-center justify-center text-white divide-x divide-solid divide-white/ py-2">
          <div className="flex items-center justify-between px-3 w-2/4">
            <img
              src="/visibility.svg"
              alt="visibility"
              className="pr-1"
              width={20}
              height={20}
            />
            <span className="font-light text-sm block w-full">
              Visibility
            </span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.visibilityAvg} {metricValues.visibility}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <img
              src="/apparent.svg"
              alt="apparent"
              className="pr-1"
              width={20}
              height={20}
            />
            <span className="font-light text-sm block w-full">
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
            <img
              src="/humidity.svg"
              alt="humidity"
              className="pr-1"
              width={20}
              height={20}
            />
            <span className="font-light text-sm block w-full">Humidity</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.humidityAvg} {metricValues.humidity}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <img
              src="/wind.svg"
              alt="wind"
              className="pr-1"
              width={20}
              height={20}
            />
            <span className="font-light text-sm block w-full">Wind</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.windSpeedAvg} {metricValues.windSpeed}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
