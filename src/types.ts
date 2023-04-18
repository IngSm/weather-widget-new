import { Type } from 'typescript';

export type Coords = {
  lon: number;
  lat: number;
};

export type Wind = {
  speed: number;
  deg: number;
};

export type GeoCity = {
  name: string
  names: Type
}

export type GeoCountryLang = {
  iso_code: string
  name: string
  name_native: string
}

export type GeoDataSource = {
  attribution: string
  licence: string
  name: string
}

export type GeoLocation = {
  latitude: number
  longitude: number
}

export type WeatherInner = {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export type WeatherMain = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export type WeatherSys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
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
  main: WeatherMain;
  name: string;
  sys: WeatherSys;
  timezone: number;
  visibility: number;
  weather: Array<WeatherInner>;
  wind: Wind;
}

export interface ICity {
  city: string;
  weather: IWeather;
}

export interface IGeoContinent {
  code: string
  geoname_id: number
  name: string
  names: Type
}

export interface IGeoCountry {
  capital: string
  currency: string
  flag: Type
  geoname_id: string
  iso_code: string
  languages: GeoCountryLang[]
  name: string
  name_native: string
  names: Type
  phone_code: string
}

export interface IGeo {
  city: GeoCity
  continent: IGeoContinent
  country: IGeoCountry
  datasource: GeoDataSource
  ip: string
  location: GeoLocation
}
