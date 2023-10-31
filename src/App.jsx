import { CssBaseline, ThemeProvider } from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import MainPage from './pages/MainPage';

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
