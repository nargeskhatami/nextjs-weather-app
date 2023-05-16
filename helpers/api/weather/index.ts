import { Weather } from "@/types/Weather";
export const getWeatherInfo = (city: string) => {
  return new Promise<Weather>((resolve, reject) => {
    fetch(`api/forecast?location=${city}`)
      .then((response) => response.json())
      .then((data:Weather) => {
        resolve(data);
      })
      .catch(() => {
        reject();
      });
  });
};
