import { useEffect, useState } from "react";

export const useThemeMode = () => {
  const [theme, setTheme] = useState("night");

  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    let time = new Date();

    let hr = time.getHours();
    if (hr >= 5 && hr <= 6) {
      setMode("dawn");
    } else if (hr > 6 && hr <= 10) {
      setMode("morning");
    } else if (hr > 10 && hr < 16) {
      setMode("midday");
    } else if (hr >= 16 && hr <= 18) {
      setMode("dusk");
    } else if (hr > 18 && hr < 24) {
      setMode("night");
    } else {
      setMode("night");
    }
  }, []);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return { theme };
};

export default useThemeMode;
