import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = ({ style, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <>
      <TextField
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleInputChange}
        className={style.search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBar;
