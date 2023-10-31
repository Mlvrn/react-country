import { Box, IconButton, Typography } from '@mui/material';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { DarkMode, LightMode } from '@mui/icons-material';

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + mode.slice(1);
  };

  return (
    <Box>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
      <Typography component="span">{capitalizeWord(mode)} mode </Typography>
    </Box>
  );
};

export default ThemeToggle;
