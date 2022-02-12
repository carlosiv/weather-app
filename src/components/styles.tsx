import styled from "styled-components";
import { ThemeProps } from "../styles/themes";

type GlobalThemeProps = {
  theme: ThemeProps;
  active: boolean;
};

export const WeatherAppContainer = styled.div`
  border-radius: 25px;
  -webkit-box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  background-color: #222831;
  height: 400px;
  position: relative;
`;

export const WeatherSideContainer = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  border-radius: 25px;
  background-image: url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
  width: 300px;
  -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  -webkit-transition: -webkit-transform 300ms ease;
  transition: -webkit-transform 300ms ease;
  -o-transition: transform 300ms ease;
  transition: transform 300ms ease;
  transition: transform 300ms ease, -webkit-transform 300ms ease;
  -webkit-transform: translateZ(0) scale(1.02) perspective(1000px);
  transform: translateZ(0) scale(1.02) perspective(1000px);
  float: left;

  &:hover {
    -webkit-transform: scale(1.1) perspective(1500px) rotateY(10deg);
    transform: scale(1.1) perspective(1500px) rotateY(10deg);
  }
`;
export const WeatherClearContainer = styled.div`
  clear: both;
`;
export const WeatherGradientContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: var(--gradient);
  border-radius: 25px;
  opacity: 0.8;
`;

export const WeatherDateContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
`;

export const WeatherDateDayNameContainer = styled.h2`
  margin: 0;
`;
export const WeatherDateDayContainer = styled.span`
  display: block;
`;

export const WeatherDateLocationContainer = styled.span`
  display: inline-block;
  margin-top: 10px;
`;
export const WeatherDateIconContainer = styled.img`
  display: inline-block;
  height: 1em;
  width: auto;
  margin-right: 5px;
`;
export const WeatherDataContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;
export const WeatherDataIconContainer = styled.img`
  height: 200px;
  width: auto;
  margin: -40px;
`;
export const WeatherDataTempContainer = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 4em;
`;
export const WeatherDataDescContainer = styled.h3`
  margin: 0;
`;

export const WeatherInfoSideContainer = styled.div`
  position: relative;
  float: left;
  height: 100%;
  padding-top: 25px;
`;

export const WeatherInfoTodayContainer = styled.div`
  padding: 15px;
  margin: 0 25px 25px 25px;
  border-radius: 10px;

  & div:not(:last-child) {
    margin: 0 0 10px 0;
  }
`;

export const WeatherInfoTodayTitleContainer = styled.span`
  float: left;
  font-weight: 700;
`;

export const WeatherInfoTodayValueContainer = styled.span`
  float: right;
`;

export const WeatherWeekContainer = styled.div`
  display: block;
`;

export const WeatherWeekListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 35px;
  box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const WeatherWeekListContentContainer = styled.li`
  float: left;
  padding: 15px;
  cursor: pointer;
  -webkit-transition: 200ms ease;
  -o-transition: 200ms ease;
  transition: 200ms ease;
  border-radius: 10px;

  &:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    background: #fff;
    color: #222831;
    -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  }
  background: ${({ active }: GlobalThemeProps) =>
    active ? "#fff" : "inherit"};
`;

export const WeatherListDayNameContainer = styled.span`
  display: block;
  margin: 10px 0 0 0;
  text-align: center;
`;

export const WeatherListDayTempContainer = styled.span`
  display: block;
  text-align: center;
  margin: 10px 0 0 0;
  font-weight: 700;
`;

export const WeatherListIconContainer = styled.img`
  height: 50px;
  width: auto;
  margin: 0 auto;
`;

export const WeatherInfoLocationContainer = styled.div`
  padding: 25px 35px;
`;

export const WeatherInfoLocationButtonContainer = styled.button`
  outline: none;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  background-image: var(--gradient);
  color: #ffffff;
  font-weight: 700;
  -webkit-box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  -webkit-transition: -webkit-transform 200ms ease;
  transition: -webkit-transform 200ms ease;
  -o-transition: transform 200ms ease;
  transition: transform 200ms ease;
  transition: transform 200ms ease, -webkit-transform 200ms ease;

  &:hover {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }
`;

export const WeatherInfoLocationIconContainer = styled.img`
  height: 1em;
  width: auto;
  margin-right: 5px;
`;

export const WeatherLocationFinderContainer = styled.div`
  margin: -10px auto;
  padding-left: 5px;
  width: 400px;
  background-color: #222831;
  border-radius: 0px 0px 25px 25px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  bottom: 0;
`;

export const Select = styled.select`
  width: 80%;
  background: #222831;
  color: white;
  font-size: 14px;
  border: none;
  margin: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
