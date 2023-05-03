import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

//
export default function Filters(props) {
  const { filterFunc, data } = props;

  const { input, setInput } = useContext(AppContext);

  function chengeOn({ target }) {
    const { value, name } = target;

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
        value={ input.inputName }
        onChange={ chengeOn }
      />
      <select
        data-testid="column-filter"
        name="selectOptions"
        value={ input.selectOptions }
        onChange={ chengeOn }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
        onClick={ () => {
          setInput((oldState) => ({
            ...oldState,
            buttonClick: true,
          }), filterFunc(data));
        } }
      >
        Filtrar
      </button>
    </div>
  );
}

Filters.propTypes = {
  filterFunc: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
};
