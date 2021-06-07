import React from 'react';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './hooks/Auth';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
