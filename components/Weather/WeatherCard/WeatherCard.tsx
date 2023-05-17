"use client";

import { TrashIcon } from "@heroicons/react/24/solid";

import { capitalizeWords } from "@/helpers/format/string";
import { getIconName } from "@/helpers/format/weather";

import { Daily } from "@/types/Weather";
import { MetricValues } from "@/enums";

export const WeatherCard = ({
  weatherInfo,
  locationInfo,
  onRemoveCity,
  index,
}: {
  weatherInfo: Daily;
  locationInfo: { name: string };
  onRemoveCity: Function;
  index: number;
}) => {
  return (
    <figure className="relative flex flex-col justify-between rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4 mx-2">
      {index > 0 && (
        <TrashIcon
          onClick={() => {
            onRemoveCity();
          }}
          className="absolute h-[20px] right-5 text-white/80 cursor-pointer transition-all hover:text-white"
        />
      )}
      <div className="flex items-center text-white">
        <svg width={56} height={56}>
          <use href={`/sprite.svg#${getIconName(weatherInfo.values.weatherCodeMax)}`} />
        </svg>
        <div className="pl-2">
          <h2 className="font-semibold">{capitalizeWords(locationInfo.name.split(",")[0])}</h2>
          <span className="font-light">{weatherInfo.time}</span>
        </div>
      </div>
      <div className="flex flex-col text-white items-center justify-center">
        <span className="text-8xl relative">
          {weatherInfo.values.temperatureAvg}
          <span className="absolute text-sm font-light top-[6px]">{MetricValues.Temperature}</span>
        </span>
        <span>{weatherInfo.values.weatherCodeMax}</span>
      </div>
      <div>
        <div className="flex items-center justify-center text-white divide-x divide-solid divide-white/60 py-2">
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#visibility`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">Visibility</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.visibilityAvg} {MetricValues.Visibility}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#apparent`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">Feels like</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.temperatureApparentAvg}
              {MetricValues.ApparentTemperature}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center text-white divide-x divide-solid divide-white/60 py-2">
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#humidity`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">Humidity</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.humidityAvg} {MetricValues.Humidity}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 w-2/4">
            <svg width={24} height={24}>
              <use href={`/sprite.svg#wind`} />
            </svg>
            <span className="pl-1 font-light text-sm block w-full">Wind</span>
            <span className="font-light text-sm whitespace-nowrap">
              {weatherInfo.values.windSpeedAvg} {MetricValues.WindSpeed}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
};
