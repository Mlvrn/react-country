export const shades = {
  elementsLight: 'hsl(0, 0%, 100%)',
  bgLight: 'hsl(0, 0%, 98%)',
  textLight: 'hsl(200, 15%, 8%)',
  inputLight: 'hsl(0, 0%, 52%)',
  elementsDark: 'hsl(209, 23%, 22%)',
  bgDark: 'hsl(207, 26%, 17%)',
  textDark: 'hsl(0, 0%, 100%)',
};

const theme = {
  palette: {
    primary: {
      main: shades.elementsDark,
    },
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: shades.elementsLight,
          },
          text: {
            primary: shades.textLight,
            secondary: shades.textLight,
          },
          background: {
            default: shades.bgLight,
            paper: shades.elementsLight,
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: shades.bgDark,
          },
          background: {
            default: shades.bgDark,
            paper: shades.elementsDark,
          },
          text: {
            primary: shades.textDark,
            secondary: shades.textDark,
          },
        }),
  },
  typography: {
    allVariants: {
      fontFamily: 'Nunito',
    },
  },
});

export default theme;
