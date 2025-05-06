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
  // InputAdornment,
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

  const [loanAmount, setLoanAmount] = useState('10000');
  const [interestRate, setInterestRate] = useState('5.5');
  const [loanTerm, setLoanTerm] = useState('5');
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
    setLoanAmount('10000');
    setInterestRate('8.5');
    setLoanTerm('5');
    setCurrency('USD');
    setMonthlyPayment(null);
    setPrincipalPayment([]);
    setInterestPayment([]);
    setRemainingBalance([]);
  };

  const getCurrencySymbol = (cur) => {
    return cur === 'USD' ? '$' : cur === 'EUR' ? '€' : cur === 'GBP' ? '£' : cur === 'CAD' ? 'C$' : cur === 'AUD' ? 'A$' : cur === 'JPY' ? '¥' : '₹';
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      {/* Title */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: 'left', fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
      >
        Loan Calculator Dashboard
      </Typography>

      {/* Row 1: Inputs */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            
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

      {/* Calculate Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          sx={{ fontSize: '1rem', px: 4 }}
        >
          Calculate
        </Button>
      </Box>

      {/* Monthly EMI */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Monthly EMI: {getCurrencySymbol(currency)}{monthlyPayment}
        </Typography>
      )}

      {/* Currency Select and Reset */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={8}>
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
                <MenuItem value="CAD">CAD</MenuItem>
                <MenuItem value="AUD">AUD</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
  item
  xs={12}
  md={4}
  sx={{ 
    display: 'flex', 
    justifyContent: { xs: 'center', md: 'flex-end' }, // Center button on mobile, right-aligned on desktop
    marginLeft: { xs: '0', md: 'auto' }, // Remove left margin on mobile, keep it on desktop
    mt: { xs: 2, sm: 3 }, // Adjust margin for mobile
  }}
>
  <Button
    variant="outlined"
    color="secondary"
    onClick={handleReset}
    sx={{ fontSize: '1rem' }}
  >
    Reset Table
  </Button>
</Grid>


        </Grid>
      )}

      {/* Amortization Table */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Amortization Schedule ({currency})
          </Typography>

          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ minWidth: 600, maxHeight: '70vh' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Month</strong></TableCell>
                    <TableCell align="center"><strong>Principal ({getCurrencySymbol(currency)})</strong></TableCell>
                    <TableCell align="center"><strong>Interest ({getCurrencySymbol(currency)})</strong></TableCell>
                    <TableCell align="center"><strong>Remaining Balance ({getCurrencySymbol(currency)})</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {principalPayment.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{payment}</TableCell>
                      <TableCell align="center">{interestPayment[index]}</TableCell>
                      <TableCell align="center">{remainingBalance[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      {/* Error message */}
      {monthlyPayment === 'Invalid input' && (
        <Typography color="error" sx={{ mt: 2 }}>
          Please enter valid positive numbers.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
