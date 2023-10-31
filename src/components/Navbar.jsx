import { AppBar, Box, IconButton, Typography } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { Favorite } from '@mui/icons-material';

const Navbar = ({ style }) => {
  return (
    <Box>
      <AppBar className={style.navbar}>
        <Box component="div">
          <Typography variant="h5" component="span">
            Where in the world?
          </Typography>
          <IconButton component="a" href="/favorites">
            <Favorite />
          </IconButton>
        </Box>
        <ThemeToggle />
      </AppBar>
    </Box>
  );
};

export default Navbar;
