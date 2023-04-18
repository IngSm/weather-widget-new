export type Coords = {
  lon: number;
  lat: number;
};

export type Wind = {
  speed: number;
  deg: number;
};

export interface IWeatherMain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeatherSys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface IWeatherInner {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IWeather {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: Coords;
  dt: number;
  id: number;
  main: IWeatherMain;
  name: string;
  sys: IWeatherSys;
  timezone: number;
  visibility: number;
  weather: Array<IWeatherInner>;
  wind: Wind;
}

export interface ICity {
  city: string;
  weather: IWeather;
}
