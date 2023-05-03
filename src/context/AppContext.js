import { createContext, useState } from 'react';
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

  return (
    <AppContext.Provider value={ { input, setInput } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default AppProvider;
