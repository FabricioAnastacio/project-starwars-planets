import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [input, setInput] = useState({
    inputName: '',
    inputNum: '0',
    selectOptions: 'population',
    condition: 'maior que',
    buttonClick: false,
  });

  const [data, setData] = useState([]);

  const values = useMemo(() => ({
    input,
    setInput,
    data,
    setData,
  }), [input, data]);

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
