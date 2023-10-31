import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Navbar from '../components/Navbar';
import style from '../styles/style.module.scss';
import { useThemeContext } from '../theme/ThemeContextProvider';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';

const FavoritesPage = () => {
  const { theme } = useThemeContext();
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteCountries(favorites);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar style={style} />
      <Box className={style.container}>
        <BackButton style={style} />
        <Typography variant="h4" component="h4">
          Favorites
        </Typography>
        <Grid container spacing={7} marginTop="0.4rem">
          {favoriteCountries.length === 0 ? (
            <p>No favorite countries yet.</p>
          ) : (
            <CountryCard data={favoriteCountries} style={style} />
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FavoritesPage;
