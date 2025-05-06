import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const ExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '2f888328785445ef59fc2c1f'; // Replace with your actual API key
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`; // USD as base currency

  useEffect(() => {
    axios.get(BASE_URL)
      .then((response) => {
        setRates(response.data.conversion_rates);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates (Base Currency: USD)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Currency</strong></TableCell>
                <TableCell align="right"><strong>Exchange Rate</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates && Object.entries(rates).map(([currency, rate]) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell align="right">{rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ExchangeRates;
