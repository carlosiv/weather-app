export type weatherProps = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: currentEntity;
  daily: dailyEntity[];
};

export type currentEntity = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherEntity[];
};

export type dailyEntity = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  temp: dailyTemp;
  feels_like: dailyFeels[];
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  pop: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherEntity[];
};

export type dailyTemp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export type dailyFeels = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type WeatherEntity = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type locationProps = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export type errorProps = {
  code: number;
  message: string;
};

export type CityProps = {
  cities: {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    };
  }[];
  displayData: React.ReactNode;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
