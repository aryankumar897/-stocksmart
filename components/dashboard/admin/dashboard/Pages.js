// pages/index.js
import React from 'react';
import Transection from './Transection';
import Analityic from './Analitic';
import { Container, Typography } from '@mui/material';
import Ai from "@/components/ai/Ai"


const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4"

        style={{
          fontSize: '3rem',
          color: '#0073e6',       // A nice blue color
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          padding: '10px',
          borderBottom: '2px solid #0073e6', // Underline effect
          letterSpacing: '1px',
        }}

      >
        Welcome to the  Inventory System
      
      
      </Typography>

      <Ai />
    

      <Analityic />

      <Typography variant="h5" sx={{ p: "8px" }}  > Recent Transection</Typography>



      <Transection />
    </Container>
  );
};

export default HomePage;
