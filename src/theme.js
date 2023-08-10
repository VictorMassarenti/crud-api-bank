import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#D3D0CB',
      dark: '#273043',
    },
    secondary: {
      main: '#A30B37',
    },
    error: {
      main: '#A30B37',
    },
    success: {
      main: '#14591D',
    },
  },
});

export default theme;