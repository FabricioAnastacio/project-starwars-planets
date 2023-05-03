import React from 'react';
import './App.css';
import TablePlanets from './components/Table';
import AppProvider from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <TablePlanets />
    </AppProvider>
  );
}

export default App;
