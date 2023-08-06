import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#D3D0CB',
    },
    secondary: {
      main: '#A30B37',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;