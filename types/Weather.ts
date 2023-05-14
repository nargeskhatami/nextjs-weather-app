export interface Weather {
  timelines: Timelines;
  location: Location;
}

interface Location {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

interface Timelines {
  daily: Daily[];
}

export interface Daily {
  time: string;
  values: Values;
}

interface Values {
  humidityAvg: number;
  temperatureApparentAvg: number;
  temperatureAvg: number;
  visibilityAvg: number;
  windSpeedAvg: number;
  weatherCodeMax: string | number;
}
