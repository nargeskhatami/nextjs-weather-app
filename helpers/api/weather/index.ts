import axios from "axios";

import { Weather } from "@/types/Weather";

export const getWeatherInfo = (city: string) => {
  return new Promise<Weather>((resolve, reject) => {
    axios(`api/forecast?location=${city}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject();
      });
  });
};
