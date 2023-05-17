"use client";
import { useCallback, useEffect, useReducer, useState } from "react";

import { WeatherCard } from "@/components/WeatherCard";
import { WeatherCardAdd } from "@/components/WeatherCardAdd";

import { Weather, Action } from "@/types/Weather";

import { getWeatherInfo } from "@/helpers/api/weather";
import * as geolocation from "@/helpers/api/geolocation";

const citiesReducer = (state: Weather[], action: Action): Weather[] => {
  if (action.type === "SET" && action.cities) return action.cities;
  if (action.type === "ADD" && action.city) return [...state, action.city];
  if (action.type === "DELETE" && action.index) {
    const citiesState = [...state];
    citiesState.splice(action.index, 1);
    return citiesState;
  }
  return [];
};

const maxCitiesNo = 3;
const defaultErrorMsg = "Sorry, Weather data is not available at the moment!";

export const WeatherContainer = () => {
  const [status, setStatus] = useState<string>("Waiting for user's location ...");
  const [cityWeatherInfoStatus, setCityWeatherInfoStatus] = useState("showData");
  const [cities, dispatch] = useReducer(citiesReducer, []);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const selectCity = useCallback((city: string) => {
    setSelectedCity(city);
  }, []);

  const removeCity = useCallback((index: number) => {
    dispatch({ type: "DELETE", index });
  }, []);

  const fetchData = async () => {
    if (selectedCity) {
      setCityWeatherInfoStatus("loadingCity");
      try {
        const data = await getWeatherInfo(selectedCity);
        dispatch({ type: "ADD", city: data });
        setCityWeatherInfoStatus("showData");
      } catch {
        setCityWeatherInfoStatus("failed");
      }
    } else if (navigator.geolocation) {
      setStatus("initialLoading");
      try {
        const data = await geolocation.getCurrentPosition(defaultErrorMsg);
        dispatch({ type: "ADD", city: data });
        setStatus("showData");
      } catch {
        setStatus(defaultErrorMsg);
      }
    } else {
      setStatus("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  let content = null;

  if (status === "initialLoading") {
    content = <div className="spinner"></div>;
  } else if (status === "showData") {
    content = cities.map((city: Weather, index: number) => (
      <WeatherCard
        index={index}
        key={`WeatherCard${index}`}
        weatherInfo={city.timelines.daily[0]}
        locationInfo={city.location}
        onRemoveCity={() => {
          removeCity(index);
        }}
      />
    ));
    if (cities.length < maxCitiesNo) {
      content.push(
        <WeatherCardAdd
          key={"WeatherCardAdd"}
          getDataStatus={cityWeatherInfoStatus}
          onCitySelect={selectCity}
        />
      );
    }
  } else {
    content = <div className="text-white/70">{status}</div>;
  }

  return content ? <div className="flex flex-wrap justify-center lg:flex-nowrap max-w-[300px] lg:max-w-full">{content}</div> : null;
};
