import { NavLink } from "react-router-dom";
import { Container } from "./styles";

export const Navbar = () => {
  return (
    <Container>
      <NavLink
        style={({ isActive }) => {
          return {
            margin: "1.5rem 2rem",
            textAlign: "center",
            width: "100px",
            background: "gray",
            fontSize: "20px",
            padding: "10px",
            borderRadius: "10px",
            textDecoration: "none",
            textDecorationColor: "none",
            color: isActive ? "orange" : "white",
          };
        }}
        to={"/"}
      >
        Current
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            margin: "1.5rem 2rem",
            textAlign: "center",
            width: "100px",
            background: "gray",
            fontSize: "20px",
            padding: "10px",
            borderRadius: "10px",
            textDecoration: "none",
            textDecorationColor: "none",
            color: isActive ? "orange" : "white",
          };
        }}
        to={"/daily"}
      >
        Daily
      </NavLink>
    </Container>
  );
};
