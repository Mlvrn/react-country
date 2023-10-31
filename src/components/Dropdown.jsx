import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const Dropdown = ({ style, onChange }) => {
  const regionsList = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  const [region, setRegion] = useState('');

  const handleRegionChange = (e) => {
    const input = e.target.value;
    setRegion(input);
    onChange(input);
  };
  return (
    <FormControl className={style.dropdown} fullWidth>
      <Select
        placeholder="Filter by Region"
        label="Filter by Region"
        value={region}
        onChange={handleRegionChange}
        displayEmpty
      >
        <MenuItem value="" sx={{ display: 'none' }}>
          Filter by Region
        </MenuItem>
        {regionsList.map((region, index) => (
          <MenuItem key={index} value={region}>
            {region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
