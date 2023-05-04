import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

//
export default function Filters(props) {
  const { filterFunc, filterNumFunc, data } = props;

  const { inputName, setName, input, setInput, optionsFilter } = useContext(AppContext);

  useEffect(() => {
    filterFunc();
  }, [inputName]);

  function chengeOn({ target }) {
    const { value, name } = target;

    if (name === 'inputName') {
      setName(value);
    }

    setInput((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="inputName"
        placeholder="Digite o nome"
        value={ inputName }
        onChange={ chengeOn }
      />
      <select
        data-testid="column-filter"
        name="selectOptions"
        value={ input.selectOptions }
        onChange={ chengeOn }
      >
        {
          optionsFilter.map((option, index) => <option key={ index }>{ option }</option>)
        }
      </select>
      <select
        data-testid="comparison-filter"
        name="condition"
        value={ input.condition }
        onChange={ chengeOn }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="inputNum"
        placeholder="Digite um numero"
        value={ input.inputNum }
        onChange={ chengeOn }
      />
      <button
        data-testid="button-filter"
        onClick={ () => filterNumFunc(data) }
      >
        Filtrar
      </button>
    </div>
  );
}

Filters.propTypes = {
  filterFunc: PropTypes.func.isRequired,
  filterNumFunc: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
};
