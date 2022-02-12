import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { dailyEntity } from "../../types/weather.types";
import pin from "../../assets/pin.png";
import temperatureIcon from "../../assets/temperature.png";

import {
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
  WeatherInfoSideContainer,
  WeatherInfoTodayContainer,
  WeatherInfoTodayTitleContainer,
  WeatherInfoTodayValueContainer,
  WeatherListDayNameContainer,
  WeatherListDayTempContainer,
  WeatherSideContainer,
  WeatherWeekContainer,
  WeatherWeekListContainer,
  WeatherWeekListContentContainer,
} from "../styles";
import { BackButton, WeatherTempIconContainer } from "./styles";

type DailyDetailsProps = {
  weatherData: dailyEntity[];
  city: string;
  country: string;
};

export const Daily = (props: DailyDetailsProps) => {
  let { day } = useParams();
  //workaround to force convert param to int
  const [param, setParam] = useState(0);
  const [filteredData, setFilteredData] = useState<dailyEntity>();
  //run when param changes
  useEffect(() => {
    if (day) {
      setParam(parseInt(day));
    }
  }, [day]);

  //filter data to display
  useEffect(() => {
    if (param && props.weatherData) {
      let dt = props.weatherData.filter((w) => w.dt === param);
      setFilteredData(dt[0]);
    }
  }, [param, props.weatherData]);

  const getMoonImage = (mp: number) => {
    if (mp === 0) {
      return "New Moon";
    } else if (mp > 0 && mp < 0.25) {
      return "Waxing Crescent";
    } else if (mp === 0.25) {
      return "1st Quarter";
    } else if (mp > 0.25 && mp < 0.5) {
      return "Waxing Gibbous";
    } else if (mp === 0.5) {
      return "Full Moon";
    } else if (mp > 0.5 && mp < 0.75) {
      return "Waning Gibbous";
    } else if (mp === 0.75) {
      return "Last Quarter";
    } else if (mp > 0.75 && mp < 1) {
      return "Waning Crescent";
    } else {
      return "New Moon";
    }
  };
  console.log(filteredData);
  return (
    <>
      {filteredData && (
        <WeatherAppContainer>
          <WeatherSideContainer>
            <WeatherGradientContainer />
            <WeatherDateContainer>
              <WeatherDateDayNameContainer>
                {moment.unix(filteredData.dt).format("dddd")}
              </WeatherDateDayNameContainer>
              <WeatherDateDayContainer>
                {moment.unix(filteredData.dt).format("DD MMM YYYY")}
              </WeatherDateDayContainer>
              <WeatherDateIconContainer src={pin} />
              <WeatherDateLocationContainer>
                {props.city}, {props.country}
              </WeatherDateLocationContainer>
            </WeatherDateContainer>
            <WeatherDataContainer>
              <WeatherDataIconContainer
                src={`https://openweathermap.org/img/wn/${filteredData.weather[0].icon}@2x.png`}
              />
              <WeatherDataTempContainer key={filteredData.temp.day}>
                {filteredData.temp.day}°C
              </WeatherDataTempContainer>
              <WeatherDataDescContainer>
                {filteredData.weather[0].description.toLocaleUpperCase()}
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
                    {moment.unix(filteredData.sunrise).format("h:mm a")}
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
                <div>
                  <WeatherInfoTodayTitleContainer>
                    SUNSET
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {moment.unix(filteredData.sunset).format("h:mm a")}
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
                <div>
                  <WeatherInfoTodayTitleContainer>
                    HUMIDITY
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {filteredData.humidity}%
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>

                <div>
                  <WeatherInfoTodayTitleContainer>
                    PROBABILITY TO RAIN
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {(filteredData.pop * 10000) / 100}%
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
                <div>
                  <WeatherInfoTodayTitleContainer>
                    RAIN VOLUME
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {filteredData.rain} mm
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
                <div>
                  <WeatherInfoTodayTitleContainer>
                    WIND
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {filteredData.wind_speed} km/h
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
                <div>
                  <WeatherInfoTodayTitleContainer>
                    MOON
                  </WeatherInfoTodayTitleContainer>
                  <WeatherInfoTodayValueContainer>
                    {getMoonImage(filteredData.moon_phase)}
                  </WeatherInfoTodayValueContainer>
                  <WeatherClearContainer />
                </div>
              </WeatherInfoTodayContainer>
            </div>

            <WeatherWeekContainer>
              <WeatherWeekListContainer>
                {Object.entries(filteredData.temp).map(([key, value]) => {
                  return (
                    <WeatherWeekListContentContainer key={key} active={false}>
                      <WeatherTempIconContainer src={temperatureIcon} />
                      <WeatherListDayNameContainer>
                        {key}
                      </WeatherListDayNameContainer>
                      <WeatherListDayTempContainer>
                        {value}°C
                      </WeatherListDayTempContainer>
                    </WeatherWeekListContentContainer>
                  );
                })}

                <WeatherClearContainer />
              </WeatherWeekListContainer>
            </WeatherWeekContainer>
          </WeatherInfoSideContainer>
        </WeatherAppContainer>
      )}
      <BackButton href="/">Home</BackButton>
    </>
  );
};
