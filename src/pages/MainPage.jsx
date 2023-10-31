import style from '../styles/style.module.scss';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CountryCard from '../components/CountryCard';
import { callApi } from '../assets/domain/api';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';

const MainPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await callApi({ endpoint: '/all', method: 'GET' });
      setCountries(data);
      setFilteredCountries(data);
    };
    fetchCountries();
  }, []);

  const handleSearch = (query) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region === 'All') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) => country.region === region);
      setFilteredCountries(filtered);
    }
  };

  return (
    <>
      <Navbar style={style} />
      <Box className={style.container}>
        <Box className={style.filters}>
          <SearchBar style={style} onSearch={handleSearch} />
          <Dropdown style={style} onChange={handleRegionChange} />
        </Box>
        <Grid container spacing={7}>
          <CountryCard data={filteredCountries} style={style} />
        </Grid>
      </Box>
    </>
  );
};

export default MainPage;
