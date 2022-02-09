import { SelectContainer, DataContainer } from "./styles";

type HomeProps = {
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
  displayData: React.ReactNode;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
};

export const Home = (props: HomeProps) => {
  return (
    <>
      {!props.loading && (
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
      )}

      <DataContainer>{props.displayData}</DataContainer>
    </>
  );
};
