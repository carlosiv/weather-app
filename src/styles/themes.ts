export interface ThemeProps {
  background: string;
  color: string;
}

export const nightTheme: ThemeProps = {
  background: "var(--night-background)",
  color: "var(--night-color)",
};

export const morningTheme: ThemeProps = {
  background: "var(--morning-background)",
  color: "var(--morning-color)",
};

export const middayTheme: ThemeProps = {
  background: "var(--midday-background)",
  color: "var(--midday-color)",
};

export const duskTheme: ThemeProps = {
  background: "var(--dusk-background)",
  color: "var(--dusk-color)",
};

export const dawnTheme: ThemeProps = {
  background: "var(--dawn-background)",
  color: "var(--dawn-color)",
};
