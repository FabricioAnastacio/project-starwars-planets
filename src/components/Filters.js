import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import './filter.css';

//
export default function Filters(props) {
  const { filterFunc, filterNumFunc, data, dellAllFiters } = props;

  const {
    inputName,
    setName,
    input,
    setInput,
    optionsFilter,
  } = useContext(AppContext);

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
    <div className="header_filter">
      <img className="img_sw_filter" src="logo.svg" alt="star wars" />
      <input
        data-testid="name-filter"
        className="input_name"
        type="text"
        name="inputName"
        placeholder="Digite o nome"
        value={ inputName }
        onChange={ chengeOn }
      />
      <div className="filters">
        <select
          data-testid="column-filter"
          name="selectOptions"
          value={ input.selectOptions }
          onChange={ chengeOn }
        >
          {
            optionsFilter.map(
              (option, index) => <option key={ index }>{ option }</option>,
            )
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
        <button
          data-testid="button-remove-filters"
          onClick={ dellAllFiters }
        >
          Remover todas filtragens
        </button>
      </div>
    </div>
  );
}

Filters.propTypes = {
  filterFunc: PropTypes.func.isRequired,
  filterNumFunc: PropTypes.func.isRequired,
  dellAllFiters: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
};
