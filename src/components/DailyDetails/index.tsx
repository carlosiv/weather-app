import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import sunrise from "../../assets/sunrise.png";
import sunset from "../../assets/sunset.png";
import {
  CardContainer,
  CardContainerContent,
  CardContainerSpan,
  Logo,
  WeatherContainer,
  WeatherIconDescriptionContainer,
} from "../../styles/app.styles";
import { dailyEntity, WeatherEntity } from "../../types/weather.types";

type DailyDetailsProps = {
  weatherData: dailyEntity[];
  getImage: (icon: string) => React.ReactNode;
};

export const DailyDetails = (props: DailyDetailsProps) => {
  let { day } = useParams();
  //workaround to force convert param to int
  const [param, setParam] = useState(0);
  const [filteredData, setFilteredData] = useState<dailyEntity>();

  useEffect(() => {
    if (day) {
      setParam(parseInt(day));
    }
  }, [day]);

  useEffect(() => {
    if (param && props.weatherData) {
      console.log(props.weatherData);
      let dt = props.weatherData.filter((w) => w.dt === param);
      setFilteredData(dt[0]);
    }
  }, [param, props.weatherData]);
  console.log(filteredData);
  return filteredData ? (
    <>
      <WeatherContainer>
        <CardContainer>
          <CardContainerContent>
            <CardContainerSpan>
              {moment.unix(filteredData.dt).format("MMM Do h:mm a")}
            </CardContainerSpan>
          </CardContainerContent>
          <CardContainerContent>
            <Logo src={sunrise} />
            <CardContainerSpan>
              {moment.unix(filteredData.sunrise).format("h:mm a")}
            </CardContainerSpan>
          </CardContainerContent>
          <CardContainerContent>
            <Logo src={sunset} />
            <CardContainerSpan>
              {moment.unix(filteredData.sunset).format("h:mm a")}
            </CardContainerSpan>
          </CardContainerContent>
          <CardContainerContent>
            Humidity:
            <CardContainerSpan>{filteredData.humidity}%</CardContainerSpan>
          </CardContainerContent>
          <CardContainerContent>
            Clouds:
            <CardContainerSpan>{filteredData.clouds}%</CardContainerSpan>
          </CardContainerContent>
          <WeatherIconDescriptionContainer>
            {filteredData.weather.map((w: WeatherEntity) => {
              return (
                <div key={w.id}>
                  <div>{props.getImage(w.icon)}</div>
                  <div>{w.description}</div>
                </div>
              );
            })}
          </WeatherIconDescriptionContainer>
        </CardContainer>
      </WeatherContainer>
    </>
  ) : (
    <div>No available data</div>
  );
};
