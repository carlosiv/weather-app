import { Link } from "react-router-dom";
import styled from "styled-components";

export const WeatherInfoTodayContainer = styled.div`
  padding: 15px;
  margin: 0 25px 25px 25px;
  border-radius: 10px;
  width: 300px;

  & div:not(:last-child) {
    margin: 0 0 10px 0;
  }
`;

export const WeatherTempIconContainer = styled.img`
  display: flex;
  height: 25px;
  width: auto;
  margin: 0 auto;
`;

export const BackButton = styled.a`
  position: absolute;
  bottom: 0;
  text-decoration: none;
  left: 50%;
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
