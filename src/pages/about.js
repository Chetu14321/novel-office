import React from 'react';

const About = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    <h2>About This App</h2>
    <p>
      Welcome to the Loan Calculator App! This app allows users to easily calculate monthly payments for different loan types.
      Whether you're planning for a home loan, personal loan, or any other type of loan, this app will help you understand
      how much you would need to pay monthly based on the loan amount, interest rate, and loan term.
    </p>

    <h3>Features</h3>
    <ul>
      <li>
        <strong>Loan Amount Input:</strong> Enter the principal loan amount you wish to borrow.
      </li>
      <li>
        <strong>Interest Rate:</strong> Input the annual interest rate of your loan to calculate payments accurately.
      </li>
      <li>
        <strong>Loan Term:</strong> Specify the loan term in years to see how your monthly payments vary.
      </li>
      <li>
        <strong>Payment Breakdown:</strong> Get a detailed breakdown of monthly principal and interest payments, along with the remaining loan balance.
      </li>
      <li>
        <strong>Currency Selection:</strong> Choose your preferred currency for calculations (USD, EUR, GBP, and more).
      </li>
    </ul>

    <h3>How It Works</h3>
    <p>
      The app uses a simple loan amortization formula to calculate the monthly payments for the loan. The formula considers the loan amount,
      interest rate, and loan term. You can input the values, and the app will calculate:
    </p>
    <ul>
      <li>Your monthly EMI (Equated Monthly Installment).</li>
      <li>The breakdown of principal and interest for each payment.</li>
      <li>The remaining loan balance after each payment.</li>
    </ul>

    <h3>Why Use This App?</h3>
    <p>
      This app is perfect for anyone who wants to get a quick and accurate estimate of their loan payments. Whether you're a first-time borrower or
      someone looking to refinance, this tool can help you make more informed financial decisions.
    </p>
  </div>
);

export default About;
