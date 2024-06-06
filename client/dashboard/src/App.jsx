import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js';
import Homepage from './pages/home/Homepage.jsx'; 

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Homepage />
    </ThemeProvider>
  );
};

export default App;
