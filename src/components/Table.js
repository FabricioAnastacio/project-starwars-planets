import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFecth';
import './table.css';
//
export default function TablePlanets() {
  const [
    data,
    loading,
    error,
    refresh,
  ] = useFetch('https://swapi.dev/api/planets');

  const [input, setInput] = useState({
    inputName: '',
    inputNum: '0',
    selectOptions: 'population',
    condition: 'maior que',
    buttonClick: false,
  });

  useEffect(() => {
    refresh();
  }, []);

  function chengeOn({ target }) {
    const { value, name } = target;

    setInput((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  }

  const filterNumData = (planets) => {
    const result = planets.filter((planet) => {
      const { inputNum, selectOptions, condition } = input;

      if (condition === 'menor que') {
        return Number(planet[selectOptions]) < Number(inputNum);
      }
      if (condition === 'maior que') {
        return Number(planet[selectOptions]) > Number(inputNum);
      }

      return Number(planet[selectOptions]) === Number(inputNum);
    });

    return result;
  };

  const filterData = (planets) => {
    const { inputName, buttonClick } = input;
    if (buttonClick) return filterNumData(planets);

    const dataFilter = planets.filter((planet) => {
      const { name } = planet;

      const filteredName = name.toUpperCase().includes(inputName.toUpperCase());
      return filteredName;
    });
    return dataFilter;
  };

  if (error) return (<h1>Ocorreu um erro, tente recarregar a pagina</h1>);
  if (loading) return (<h1>Carregando...</h1>);

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
          }), filterData(data));
        } }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filterData(data).map((planet) => (
              <tr key={ planet.edited }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
