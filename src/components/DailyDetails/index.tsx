import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import sunrise from "../../assets/sunrise.png";
import sunset from "../../assets/sunset.png";
import {
  CardContainer,
  CardContainerContent,
  CardContainerSpan,
  LocationContainer,
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
    <LocationContainer>No Data</LocationContainer>
  );
};
