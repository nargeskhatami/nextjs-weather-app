import axios from "axios";

import { getWeatherInfo } from "@/helpers/api/weather";

import { Weather } from "@/types/Weather";

export const getCurrentPosition = (defaultErrorMsg: string) => {
  return new Promise<Weather>(async (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await successCallback(position);
          resolve(data);
        } catch {
          reject(defaultErrorMsg);
        }
      },
      (error) => {
        const errorMsg = errorCallback(error, defaultErrorMsg);
        reject(errorMsg);
      }
    );
  });
};

const successCallback = async (position: GeolocationPosition) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  return new Promise<Weather>(async (resolve, reject) => {
    try {
      const res = await axios(`api/city?lat=${lat}&long=${long}`);
      const data = await getWeatherInfo(res.data);
      if (data.timelines.daily.length) {
        resolve(data);
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

const errorCallback = (error: GeolocationPositionError, defaultMsg: string): string => {
  if (error.code) {
    if (error.code === error.PERMISSION_DENIED) return "User denied the request for Geolocation.";
    else if (error.code === error.POSITION_UNAVAILABLE)
      return "Location information is unavailable.";
    else if (error.code === error.TIMEOUT) return "The request to get user location timed out.";
    else return defaultMsg;
  } else return defaultMsg;
};
