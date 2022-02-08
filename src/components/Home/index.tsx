import { CityProps } from "../../types/weather.types";
import { SelectContainer, DataContainer } from "./styles";

export const Home = (props: CityProps) => {
  return (
    <>
      <SelectContainer>
        <select name="city" onChange={props.handleSelectChange}>
          <option value="select">Please select your Location</option>
          {props.cities
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
      </SelectContainer>

      <DataContainer>{props.displayData}</DataContainer>
    </>
  );
};
