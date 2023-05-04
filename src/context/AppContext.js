import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [inputName, setName] = useState('');

  const [input, setInput] = useState({
    inputNum: '0',
    selectOptions: 'population',
    condition: 'maior que',
  });

  const [data, setData] = useState([]);

  const [filters, setFilter] = useState([]);

  const [optionsFilter, setOption] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const values = useMemo(() => ({
    optionsFilter,
    setOption,
    input,
    setInput,
    data,
    setData,
    inputName,
    setName,
    filters,
    setFilter,
  }), [input, data, inputName, filters, optionsFilter]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default AppProvider;
