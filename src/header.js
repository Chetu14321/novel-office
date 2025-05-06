import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from './themeContex';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Exchange Rates (Live)', path: '/exchange' },
    { label: 'About', path: '/about' },
    { label: 'Error Page', path: '/*' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ height: 80, justifyContent: 'center' }}>
        <Toolbar sx={{ minHeight: 80 }}>
          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* Menu Icon (Left) */}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <Menu />
              </IconButton>

              {/* Title (Center) */}
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontSize: '1.6rem',
                  ml: -5, // Shift left to counterbalance switch
                }}
              >
                Loan Calculator
              </Typography>

              {/* Dark Mode Switch (Right) */}
              <Switch
                checked={isDark}
                onChange={colorMode.toggleColorMode}
                color="default"
              />
            </Box>
          ) : (
            <>
              {/* Desktop View: Title on Left, Links, Switch */}
              <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.6rem' }}>
                Loan Calculator
              </Typography>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  color="inherit"
                  component={Link}
                  to={link.path}
                  sx={{ fontSize: '1.1rem', mx: 2 }}
                >
                  {link.label}
                </Button>
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                <Switch
                  checked={isDark}
                  onChange={colorMode.toggleColorMode}
                  color="default"
                  sx={{ mx: 1 }}
                />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={isDark}
                onChange={colorMode.toggleColorMode}
                color="default"
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
