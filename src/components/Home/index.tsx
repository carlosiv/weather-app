import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { weatherProps } from "../../types/weather.types";
import pin from "../../assets/pin.png";

import {
  Select,
  WeatherAppContainer,
  WeatherClearContainer,
  WeatherDataContainer,
  WeatherDataDescContainer,
  WeatherDataIconContainer,
  WeatherDataTempContainer,
  WeatherDateContainer,
  WeatherDateDayContainer,
  WeatherDateDayNameContainer,
  WeatherDateIconContainer,
  WeatherDateLocationContainer,
  WeatherGradientContainer,
  WeatherInfoLocationButtonContainer,
  WeatherInfoLocationContainer,
  WeatherInfoLocationIconContainer,
  WeatherInfoSideContainer,
  WeatherInfoTodayContainer,
  WeatherInfoTodayTitleContainer,
  WeatherInfoTodayValueContainer,
  WeatherListDayNameContainer,
  WeatherListDayTempContainer,
  WeatherListIconContainer,
  WeatherLocationFinderContainer,
  WeatherSideContainer,
  WeatherWeekContainer,
  WeatherWeekListContainer,
  WeatherWeekListContentContainer,
} from "../styles";

type HomeProps = {
  weatherData: weatherProps;
  city: string;
  country: string;
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
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Home = (props: HomeProps) => {
  const [showSelect, setShowSelect] = useState(false);
  return (
    <>
      <WeatherAppContainer>
        <WeatherSideContainer>
          <WeatherGradientContainer />
          <WeatherDateContainer>
            <WeatherDateDayNameContainer>
              {moment.unix(props.weatherData.current.dt).format("dddd")}
            </WeatherDateDayNameContainer>
            <WeatherDateDayContainer>
              {moment.unix(props.weatherData.current.dt).format("DD MMM YYYY")}
            </WeatherDateDayContainer>
            <WeatherDateIconContainer src={pin} />
            <WeatherDateLocationContainer>
              {props.city}, {props.country}
            </WeatherDateLocationContainer>
          </WeatherDateContainer>
          <WeatherDataContainer>
            <WeatherDataIconContainer
              src={`https://openweathermap.org/img/wn/${props.weatherData.current.weather[0].icon}@2x.png`}
            />
            <WeatherDataTempContainer>
              {props.weatherData.current.temp}°C
            </WeatherDataTempContainer>
            <WeatherDataDescContainer>
              {props.weatherData.current.weather[0].description.toLocaleUpperCase()}
            </WeatherDataDescContainer>
          </WeatherDataContainer>
        </WeatherSideContainer>
        <WeatherInfoSideContainer>
          <div>
            <WeatherInfoTodayContainer>
              <div>
                <WeatherInfoTodayTitleContainer>
                  SUNRISE
                </WeatherInfoTodayTitleContainer>
                <WeatherInfoTodayValueContainer>
                  {moment
                    .unix(props.weatherData.current.sunrise)
                    .format("h:mm a")}
                </WeatherInfoTodayValueContainer>
                <WeatherClearContainer />
              </div>
              <div>
                <WeatherInfoTodayTitleContainer>
                  SUNSET
                </WeatherInfoTodayTitleContainer>
                <WeatherInfoTodayValueContainer>
                  {moment
                    .unix(props.weatherData.current.sunset)
                    .format("h:mm a")}
                </WeatherInfoTodayValueContainer>
                <WeatherClearContainer />
              </div>
              <div>
                <WeatherInfoTodayTitleContainer>
                  HUMIDITY
                </WeatherInfoTodayTitleContainer>
                <WeatherInfoTodayValueContainer>
                  {props.weatherData.current.humidity}%
                </WeatherInfoTodayValueContainer>
                <WeatherClearContainer />
              </div>
              <div>
                <WeatherInfoTodayTitleContainer>
                  WIND
                </WeatherInfoTodayTitleContainer>
                <WeatherInfoTodayValueContainer>
                  {props.weatherData.current.wind_speed} km/h
                </WeatherInfoTodayValueContainer>
                <WeatherClearContainer />
              </div>
            </WeatherInfoTodayContainer>
          </div>
          <WeatherWeekContainer>
            <WeatherWeekListContainer>
              {props.weatherData.daily.slice(0, 5).map((w) => (
                <Link
                  key={w.dt}
                  to={`/day/${w.dt}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <WeatherWeekListContentContainer
                    active={
                      moment.unix(w.dt).format("ddd") ===
                      moment.unix(props.weatherData.current.dt).format("ddd")
                        ? true
                        : false
                    }
                  >
                    <WeatherListIconContainer
                      src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
                    />
                    <WeatherListDayNameContainer>
                      {moment.unix(w.dt).format("ddd")}
                    </WeatherListDayNameContainer>
                    <WeatherListDayTempContainer>
                      {w.temp.day}°C
                    </WeatherListDayTempContainer>
                  </WeatherWeekListContentContainer>
                </Link>
              ))}

              <WeatherClearContainer />
            </WeatherWeekListContainer>
          </WeatherWeekContainer>
          <WeatherInfoLocationContainer>
            <WeatherInfoLocationButtonContainer
              onClick={() => setShowSelect(!showSelect)}
            >
              <WeatherInfoLocationIconContainer src={pin} />
              <span>{showSelect ? "Hide Select" : "Change location"}</span>
            </WeatherInfoLocationButtonContainer>
          </WeatherInfoLocationContainer>
          {showSelect && (
            <WeatherLocationFinderContainer>
              <Select onChange={props.handleSelectChange}>
                <option value="select">Please select your Location</option>
                {props.cities
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
              </Select>
            </WeatherLocationFinderContainer>
          )}
        </WeatherInfoSideContainer>
      </WeatherAppContainer>
    </>
  );
};
