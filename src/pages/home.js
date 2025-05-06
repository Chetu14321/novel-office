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
    <Box sx={{ textAlign: 'left' }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'left' }}>
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
            sx={{ fontSize: '1.2rem', input: { fontSize: '1.2rem', py: 2.5 } }}
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
            sx={{ fontSize: '1.2rem', input: { fontSize: '1.2rem', py: 2.5 } }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Loan Term (Years)"
            type="number"
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            sx={{ fontSize: '1.2rem', input: { fontSize: '1.2rem', py: 2.5 } }}
          />
        </Grid>
      </Grid>

      {/* Row 2: Calculate Button */}
      <Box sx={{ mt: 3, textAlign: 'left' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          sx={{
            fontSize: '1rem', // Increased font size
            padding: '8px 30px', // Increased padding
          }}
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
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Grid container spacing={2} sx={{ mt: 3, textAlign: 'left', paddingBottom:'20px'}}>
          {/* Currency Box */}
          <Grid item xs={12} md={8}> {/* Increased size to 8/12 */}
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
                sx={{padding:'8px 12px'}}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem> {/* Added CAD */}
                <MenuItem value="AUD">AUD</MenuItem> {/* Added AUD */}
                <MenuItem value="JPY">JPY</MenuItem> {/* Added JPY */}
                <MenuItem value="INR">INR</MenuItem> {/* Added INR */}
              </Select>
            </FormControl>
          </Grid>

          {/* Reset Button Box */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="outlined" color="secondary" onClick={handleReset}
              sx={{
                fontSize: '1.2rem', // Increased font size
                padding: '6px 12px',
                marginRight:'1px' 
                // Increased padding
              }}
            >
              Reset Table
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Row 5: Amortization Table */}
      {monthlyPayment && !isNaN(monthlyPayment) && (
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'left',maxHeight:'80vh' }}>
            Amortization Schedule ({currency})
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowY: 'auto', fontSize: '1.2rem' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <strong>Month</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <strong>Principal ({getCurrencySymbol(currency)})</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <strong>Interest ({getCurrencySymbol(currency)})</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'cemter', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <strong>Remaining Balance ({getCurrencySymbol(currency)})</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {principalPayment.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center', padding: '16px' }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '16px' }}>{payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '16px' }}>{interestPayment[index]}</TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '16px' }}>{remainingBalance[index]}</TableCell>
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
