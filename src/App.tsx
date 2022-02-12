import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Daily } from "./components/Daily";
import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import citiesData from "./city.list.json";

import { errorProps, locationProps, weatherProps } from "./types/weather.types";
import {
  HeaderContainer,
  HeaderSubtitle,
  HeaderTitle,
  Spinner,
} from "./styles/app.styles";
import { ThemeProvider } from "styled-components";
import ThemeContext from "./contexts/ThemeContext";
import useThemeMode from "./hooks/useThemeMode";
import {
  dawnTheme,
  duskTheme,
  middayTheme,
  morningTheme,
  nightTheme,
} from "./styles/themes";
import GlobalStyle from "./styles/GlobalStyle";
function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API;

  //states
  const [location, setLocation] = useState<locationProps>({} as locationProps);
  const [weatherData, setWeatherData] = useState<weatherProps>(
    {} as weatherProps
  );
  const [cities] = useState(citiesData);
  const [cityID, setCityID] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState({});
  const { theme } = useThemeMode();

  useEffect(() => {
    switch (theme) {
      case "night":
        setMode(nightTheme);
        break;
      case "morning":
        setMode(morningTheme);
        break;
      case "midday":
        setMode(middayTheme);
        break;
      case "dusk":
        setMode(duskTheme);
        break;
      case "dawn":
        setMode(dawnTheme);
        break;
      default:
        setMode(morningTheme);
        break;
    }
  }, [theme]);

  //success callback for navigator
  const success = (pos: locationProps) => {
    let { latitude, longitude } = pos.coords;

    setLocation({
      coords: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };
  //error callback for navigator
  const error = (err: errorProps) => {
    //`ERROR(${err.code}): ${err.message}`
    console.warn("an error occured");
  };

  //https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid={API key}
  //http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}

  //get initial weather from current location and get city by reverse geolocation
  const getInitialWeather = () => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
    })
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .then(() => {
        axios({
          method: "get",
          url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
        }).then((response) => {
          setCity(response.data[0].name);
          setCountry(response.data[0].country);
        });
      });
  };

  //run once and get location when user initially views the page
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      error({
        code: 0,
        message: "Geolocation not Supported",
      });
    }
    //using navigator from MDN Docs
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //run after coordinates from geolocation is set or changes
  useEffect(() => {
    if (location.coords) {
      getInitialWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.coords]);

  //useEffect for dropdown city lookup
  useEffect(() => {
    if (cityID !== "") {
      axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude.toString()}&lon=${location.coords.longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`,
      }).then(function (response) {
        setWeatherData(response.data);
      });
    }
  }, [
    cityID,
    location?.coords?.latitude,
    location?.coords?.longitude,
    API_KEY,
  ]);

  //handle select dropdown
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

  return (
    <ThemeContext>
      <ThemeProvider theme={mode}>
        <GlobalStyle />

        {loading && <Spinner />}
        {!loading && (
          <HeaderContainer>
            <HeaderTitle>Local Weather App</HeaderTitle>
            <HeaderSubtitle
              href="https://www.openweathermap.org"
              target="_blank"
            >
              www.openweathermap.org
            </HeaderSubtitle>
          </HeaderContainer>
        )}
        <Routes>
          {!loading && (
            <Route
              path="/"
              element={
                <Home
                  weatherData={weatherData}
                  city={city}
                  country={country}
                  cities={cities}
                  handleSelectChange={handleSelectChange}
                />
              }
            />
          )}

          {!loading && (
            <Route
              path="/day/:day"
              element={
                <Daily
                  weatherData={weatherData.daily}
                  city={city}
                  country={country}
                />
              }
            />
          )}

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", margin: "0 auto" }}>
                {!loading && <p>There's nothing here!</p>}
              </main>
            }
          />
        </Routes>
      </ThemeProvider>
    </ThemeContext>
  );
}

export default App;
