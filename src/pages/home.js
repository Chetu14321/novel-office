import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useDocumentTitle from '../hooks/customhooks';

const Home = () => {
  useDocumentTitle('Loan Calculator Dashboard');

  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [principalPayment, setPrincipalPayment] = useState([]);
  const [interestPayment, setInterestPayment] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState([]);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (
      isNaN(principal) ||
      isNaN(annualRate) ||
      isNaN(years) ||
      principal <= 0 ||
      annualRate <= 0 ||
      years <= 0
    ) {
      setMonthlyPayment('Invalid input');
      setPrincipalPayment([]);
      setInterestPayment([]);
      setRemainingBalance([]);
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthly = numerator / denominator;

    let balance = principal;
    let principalPayments = [];
    let interestPayments = [];
    let remainingBalances = [];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPaymentMonth = balance * monthlyRate;
      const principalPaymentMonth = monthly - interestPaymentMonth;
      balance -= principalPaymentMonth;

      principalPayments.push(principalPaymentMonth.toFixed(2));
      interestPayments.push(interestPaymentMonth.toFixed(2));
      remainingBalances.push(balance.toFixed(2));
    }

    setMonthlyPayment(monthly.toFixed(2));
    setPrincipalPayment(principalPayments);
    setInterestPayment(interestPayments);
    setRemainingBalance(remainingBalances);
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setCurrency('USD');
    setMonthlyPayment(null);
    setPrincipalPayment([]);
    setInterestPayment([]);
    setRemainingBalance([]);
  };

  const getCurrencySymbol = (cur) => {
    return cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£';
  };

  return (
    <Box sx={{ p: 1, textAlign: 'left' }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      {/* Row 1: Loan Amount, Interest Rate, Loan Term */}
      <Grid container spacing={2} sx={{ textAlign: 'left' }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getCurrencySymbol(currency)}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Loan Term (Years)"
            type="number"
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Row 2: Calculate Button */}
      <Box sx={{ mt: 3, textAlign: 'left' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </Box>

      {/* Row 3: Monthly EMI */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Typography variant="h6" sx={{ mt: 3, textAlign: 'left' }}>
          Monthly EMI: {getCurrencySymbol(currency)}{monthlyPayment}
        </Typography>
      )}

      {/* Row 4: Currency and Reset Button */}
      <Grid container spacing={2} sx={{ mt: 3, textAlign: 'left' }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Row 5: Amortization Table */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Amortization Schedule ({currency})
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'left' }}><strong>Month</strong></TableCell>
                  <TableCell sx={{ textAlign: 'left' }}><strong>Principal ({getCurrencySymbol(currency)})</strong></TableCell>
                  <TableCell sx={{ textAlign: 'left' }}><strong>Interest ({getCurrencySymbol(currency)})</strong></TableCell>
                  <TableCell sx={{ textAlign: 'left' }}><strong>Remaining Balance ({getCurrencySymbol(currency)})</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {principalPayment.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'left' }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: 'left' }}>{payment}</TableCell>
                    <TableCell sx={{ textAlign: 'left' }}>{interestPayment[index]}</TableCell>
                    <TableCell sx={{ textAlign: 'left' }}>{remainingBalance[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {monthlyPayment === 'Invalid input' && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'left' }}>
          Please enter valid positive numbers.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
