import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Navbar from '../components/Navbar';
import style from '../styles/style.module.scss';

import { useThemeContext } from '../theme/ThemeContextProvider';
import { Favorite } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callApi } from '../assets/domain/api';
import BackButton from '../components/BackButton';

const DetailsPage = () => {
  const { theme } = useThemeContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [country, setCountry] = useState('');
  const [domains, setDomains] = useState('');
  const [currencies, setCurrencies] = useState('');
  const [languages, setLanguages] = useState('');
  const [borderCountries, setBorderCountries] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.cca3 === state.cca3
    );

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.cca3 !== state.cca3
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(state);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    setIsFavorite(!isAlreadyFavorite);
  };

  useEffect(() => {
    const getCountryData = async () => {
      const borders =
        state.borders && state.borders.length > 0
          ? await callApi({
              endpoint: `/alpha?codes=${state.borders.join(',')}`,
              method: 'GET',
            })
          : [];
      setBorderCountries(borders.map((code) => code.name.common));

      setCountry(state);
      setCurrencies(
        Object.values(state.currencies)
          .map((currency) => currency.name)
          .join(', ')
      );
      setLanguages(
        Object.values(state.languages)
          .map((language) => language)
          .join(', ')
      );
      setDomains(state.tld.join(', '));
    };
    getCountryData();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.cca3 === state.cca3
    );
    setIsFavorite(isAlreadyFavorite);
  }, [state]);

  const navigateToCountry = async (countryName) => {
    const countryData = await callApi({
      endpoint: `/name/${countryName}`,
      method: 'GET',
    });
    const country = countryData[0];

    navigate(`/details/${country?.cca3}`, { state: country });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar style={style} />
      <Box className={style.container}>
        <Box className={style.actions}>
          <BackButton style={style} />
          <Button
            variant="contained"
            className={style.button}
            onClick={toggleFavorite}
            style={{ color: isFavorite ? 'red' : 'initial' }}
          >
            <Favorite />
            <Typography component="span">
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Typography>
          </Button>
        </Box>
        <Box className={style.content}>
          <Box component="img" src={state?.flags?.png} />
          <Box className={style.details_container}>
            <Typography variant="h5">{state?.name?.common}</Typography>
            <Box className={style.details}>
              <Box>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Native Name:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {
                      country?.name?.nativeName[
                        Object.keys(country.name.nativeName)[0]
                      ].official
                    }
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Population:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {country?.population?.toLocaleString()}
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Region:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {country?.region}
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Sub Region:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {country?.subregion}
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Capital:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {country?.capital}
                  </Typography>
                </p>
              </Box>
              <Box>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Top Level Domain:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {domains}
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Currencies:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {currencies}
                  </Typography>
                </p>
                <p>
                  <Typography
                    variant="body1"
                    component="span"
                    className={style.info}
                  >
                    Languages:{' '}
                  </Typography>
                  <Typography variant="body1" component="span">
                    {languages}
                  </Typography>
                </p>
              </Box>
            </Box>
            <Box className={style.borders}>
              <Typography
                variant="body1"
                component="span"
                className={style.info}
              >
                Border Countries:
              </Typography>
              {borderCountries.length > 0 ? (
                borderCountries.sort().map((country) => (
                  <Button
                    key={country}
                    variant="contained"
                    onClick={() => navigateToCountry(country)}
                  >
                    {country}
                  </Button>
                ))
              ) : (
                <Typography component="span">
                  This country has no bordering countries.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DetailsPage;
