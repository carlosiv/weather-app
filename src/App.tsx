import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Daily } from "./components/Daily";
import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import citiesData from "./city.list.json";
import sunrise from "./assets/sunrise.png";
import sunset from "./assets/sunset.png";
import eye from "./assets/eye.png";

import {
  errorProps,
  locationProps,
  weatherProps,
  dailyEntity,
  WeatherEntity,
} from "./types/weather.types";
import { Navbar } from "./components/Navbar";
import {
  CardContainer,
  CardContainerContent,
  CardContainerSpan,
  LocationContainer,
  Logo,
  WeatherContainer,
  WeatherIconDescriptionContainer,
} from "./styles/app.styles";
import { DailyDetails } from "./components/DailyDetails";
function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API;

  //using navigator from MDN Docs

  const [location, setLocation] = useState<locationProps>({} as locationProps);
  const [weatherData, setWeatherData] = useState<weatherProps>(
    {} as weatherProps
  );
  const [cities] = useState(citiesData);
  const [cityID, setCityID] = useState("");
  const [city, setCity] = useState("");

  const success = (pos: locationProps) => {
    let { latitude, longitude } = pos.coords;

    setLocation({
      coords: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  const error = (err: errorProps) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  //https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid={API key}
  //http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}

  const getInitialWeather = () => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
    })
      .then((response) => {
        setWeatherData(response.data);
      })
      .then(() => {
        axios({
          method: "get",
          url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
        }).then((response) => {
          setCity(response.data[0].name);
        });
      });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      error({
        code: 0,
        message: "Geolocation not Supported",
      });
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (location.coords) {
      getInitialWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.coords]);

  useEffect(() => {
    if (cityID !== "") {
      axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
      }).then(function (response) {
        setWeatherData(response.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityID, location.coords.latitude, location.coords.longitude]);
  const getImage = (icon: string) => {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
    );
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let ct = cities.filter((city) => city.id === parseInt(event.target.value));
    setCity(ct[0].name);
    setCityID(ct[0].id.toString());
    setLocation({
      coords: {
        latitude: ct[0].coord.lat,
        longitude: ct[0].coord.lon,
      },
    });
  };

  const displayCurrentData = () => {
    if (city) {
      return (
        <>
          <LocationContainer>{city}</LocationContainer>
          <WeatherContainer>
            <CardContainer>
              <CardContainerContent>
                <CardContainerSpan>
                  {moment.unix(weatherData.current.dt).format("MMM Do h:mm a")}
                </CardContainerSpan>
              </CardContainerContent>
              <CardContainerContent>
                <Logo src={sunrise} />
                <CardContainerSpan>
                  {moment.unix(weatherData.current.sunrise).format("h:mm a")}
                </CardContainerSpan>
              </CardContainerContent>
              <CardContainerContent>
                <Logo src={sunset} />
                <CardContainerSpan>
                  {moment.unix(weatherData.current.sunset).format("h:mm a")}
                </CardContainerSpan>
              </CardContainerContent>
              <CardContainerContent>
                Humidity:
                <CardContainerSpan>
                  {weatherData.current.humidity}%
                </CardContainerSpan>
              </CardContainerContent>
              <CardContainerContent>
                Clouds:
                <CardContainerSpan>
                  {weatherData.current.clouds}%
                </CardContainerSpan>
              </CardContainerContent>
              <WeatherIconDescriptionContainer>
                {weatherData.current.weather.map((w: WeatherEntity) => {
                  return (
                    <div key={w.id}>
                      <div>{getImage(w.icon)}</div>
                      <div>{w.description}</div>
                    </div>
                  );
                })}
              </WeatherIconDescriptionContainer>
            </CardContainer>
          </WeatherContainer>
        </>
      );
    } else {
      return <LocationContainer>No Data</LocationContainer>;
    }
  };

  const displayDailyData = () => {
    if (city) {
      return (
        <>
          <LocationContainer>{city}</LocationContainer>
          <WeatherContainer>
            {weatherData.daily.map((d: dailyEntity) => {
              return (
                <CardContainer key={d.dt}>
                  <CardContainerContent>
                    <CardContainerSpan>
                      {moment.unix(d.dt).format("MMM Do")}
                    </CardContainerSpan>
                  </CardContainerContent>
                  <CardContainerContent>
                    <Logo src={sunrise} />
                    <CardContainerSpan>
                      {moment.unix(d.sunrise).format("h:mm a")}
                    </CardContainerSpan>
                  </CardContainerContent>
                  <CardContainerContent>
                    <Logo src={sunset} />
                    <CardContainerSpan>
                      {moment.unix(d.sunset).format("h:mm a")}
                    </CardContainerSpan>
                  </CardContainerContent>
                  <CardContainerContent>
                    Humidity:
                    <CardContainerSpan>{d.humidity}%</CardContainerSpan>
                  </CardContainerContent>
                  <CardContainerContent>
                    Clouds:<CardContainerSpan>{d.clouds}%</CardContainerSpan>
                  </CardContainerContent>
                  <WeatherIconDescriptionContainer>
                    {d.weather.map((w: WeatherEntity) => {
                      return (
                        <div key={w.id}>
                          <div>{getImage(w.icon)}</div>
                          <div>{w.description}</div>
                        </div>
                      );
                    })}
                  </WeatherIconDescriptionContainer>
                  <Link to={`/daily/${d.dt}`}>
                    <Logo src={eye} />
                  </Link>
                </CardContainer>
              );
            })}
          </WeatherContainer>
        </>
      );
    } else {
      return <LocationContainer>No Data</LocationContainer>;
    }
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cities={cities}
              displayData={displayCurrentData()}
              handleSelectChange={handleSelectChange}
            />
          }
        />
        <Route
          path="daily"
          element={
            <Daily
              cities={cities}
              displayData={displayDailyData()}
              handleSelectChange={handleSelectChange}
            />
          }
        />
        <Route
          path="/daily/:day"
          element={
            <DailyDetails weatherData={weatherData.daily} getImage={getImage} />
          }
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
