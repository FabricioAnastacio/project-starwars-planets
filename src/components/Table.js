import { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFecth';
import './table.css';
import { AppContext } from '../context/AppContext';
import Filters from './Filters';
//
export default function TablePlanets() {
  const [
    data,
    loading,
    error,
    refresh,
  ] = useFetch('https://swapi.dev/api/planets');

  const { input } = useContext(AppContext);

  useEffect(() => {
    refresh();
  }, []);

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
      <Filters
        filterFunc={ filterData }
        data={ data }
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
