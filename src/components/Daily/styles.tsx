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
