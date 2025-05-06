import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './pages/home';
import ExchangeRates from './pages/liveexchange';
import About from './pages/about';
import NotFound from './pages/notfound';
import { CustomThemeProvider } from './themeContex';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        <Header />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
