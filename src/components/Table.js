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

  const filterData = (planets) => {
    const { inputName } = input;
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
        value={ input.inputName }
        onChange={ chengeOn }
      />
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
