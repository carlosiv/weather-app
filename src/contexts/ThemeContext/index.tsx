import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";
import {
  nightTheme,
  morningTheme,
  middayTheme,
  duskTheme,
  dawnTheme,
} from "../../styles/themes";

const ThemeContext: React.FC = ({ children }) => {
  const { theme } = useThemeMode();

  const [thmode, setThmode] = useState({});

  useEffect(() => {
    switch (theme) {
      case "night":
        setThmode(nightTheme);
        break;
      case "morning":
        setThmode(morningTheme);
        break;
      case "midday":
        setThmode(middayTheme);
        break;
      case "dusk":
        setThmode(duskTheme);
        break;
      case "dawn":
        setThmode(dawnTheme);
        break;
      default:
        setThmode(morningTheme);
        break;
    }
  }, [theme]);

  return <ThemeProvider theme={thmode}>{children}</ThemeProvider>;
};

export default ThemeContext;
