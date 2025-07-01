// src/theme/theme.ts

import Settings from '../data/settings.json';

export const colors = {
  primary: Settings.colors.primary,
  secondary: Settings.colors.secondary,
  black: Settings.colors.black,
  white: Settings.colors.white,
};

export type Theme = {
  colors: typeof colors;
  typography: {
    fontFamily: string;
    fontWeight: number;
    fontSize: number;
  };
  // ajoute d'autres options si besoin
};

export const lightTheme: Theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    black: colors.black,
    white: colors.white,
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 500,
    fontSize: 16,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    black: colors.white, // inversion pour dark mode (texte clair)
    white: colors.black, // bg foncé
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 500,
    fontSize: 16,
  },
};

