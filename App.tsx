import React, { useEffect } from 'react';
import { Router } from './src/routes/Router';
import { AuthProvider } from './src/contexts/Auth';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;