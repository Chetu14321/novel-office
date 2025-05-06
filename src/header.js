import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box
} from '@mui/material';
import { WbSunny, NightsStay } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from './themeContex';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isDark = theme.palette.mode === 'dark';

  return (
    <AppBar position="static" sx={{ height: 80, justifyContent: 'center' }}>
      <Toolbar sx={{ minHeight: 80 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.6rem' }}>
          Loan Calculator
        </Typography>

        <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.1rem', mx: 7 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/exchange" sx={{ fontSize: '1.1rem', mx: 2 }}>
          Exchange Rates (Live)
        </Button>
        <Button color="inherit" component={Link} to="/about" sx={{ fontSize: '1.1rem', mx: 3 }}>
          About
        </Button>
        <Button color="inherit" component={Link} to="/*" sx={{ fontSize: '1.1rem', mx: 1 }}>
          Error Page
        </Button>

        {/* Switch with Icons */}
        {/* import { WbSunny, NightsStay } from '@mui/icons-material'; */}

<Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
  {/* <WbSunny fontSize="large" /> */}
  <Switch
    checked={isDark}
    onChange={colorMode.toggleColorMode}
    color="default"
    sx={{ mx: 1 }} // Optional spacing between icons and switch
  />
  {/* <NightsStay fontSize="large" /> */}
</Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
