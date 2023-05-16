import { NextResponse } from "next/server";

import { getDateFormat } from "@/helpers/format/date";
import { getWeatherFormat } from "@/helpers/format/weather";

import { Daily } from "@/types/Weather";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const res = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&apikey=${process.env.TOMORROWIO_API_KEY}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  data.timelines.daily = data.timelines.daily.map((item: Daily) => {
    return {
      time: getDateFormat(item.time),
      values: {
        humidityAvg: Math.trunc(item.values.humidityAvg),
        temperatureApparentAvg: Math.trunc(item.values.temperatureApparentAvg),
        temperatureAvg: Math.trunc(item.values.temperatureAvg),
        visibilityAvg: Math.trunc(item.values.visibilityAvg),
        windSpeedAvg: Math.trunc(item.values.windSpeedAvg),
        weatherCodeMax: getWeatherFormat(item.values.weatherCodeMax),
      },
    };
  });
  return NextResponse.json(data);
}
