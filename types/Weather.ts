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
  values: WeatherValues;
}

interface WeatherValues {
  humidityAvg: number;
  temperatureApparentAvg: number;
  temperatureAvg: number;
  visibilityAvg: number;
  windSpeedAvg: number;
  weatherCodeMax: string | number;
}

export interface Action {
  type: 'SET' | 'ADD' | 'DELETE'; // a union type of the possible values for the type property
  cities?: Weather[];
  city?: Weather; 
  index?: number;
};