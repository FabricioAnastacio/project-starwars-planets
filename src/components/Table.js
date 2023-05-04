import { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFecth';
import './table.css';
import { AppContext } from '../context/AppContext';
import Filters from './Filters';
//
export default function TablePlanets() {
  const [
    dataInfo,
    loading,
    error,
    refresh,
  ] = useFetch('https://swapi.dev/api/planets');

  const {
    inputName,
    input,
    setInput,
    data,
    setData,
    filters,
    setFilter,
    optionsFilter,
    setOption,
  } = useContext(AppContext);

  useEffect(() => {
    refresh();
  }, []);

  function dellOptionFiter(param) {
    const newOptions = optionsFilter.filter((option) => option !== param);
    setOption(newOptions);
    setInput((oldState) => ({
      ...oldState,
      selectOptions: newOptions[0],
    }));
  }

  const filterNumData = (planets) => {
    const { inputNum, selectOptions, condition } = input;
    const result = planets.filter((planet) => {
      if (condition === 'menor que') {
        return Number(planet[selectOptions]) < Number(inputNum);
      }
      if (condition === 'maior que') {
        return Number(planet[selectOptions]) > Number(inputNum);
      }

      return Number(planet[selectOptions]) === Number(inputNum);
    });

    dellOptionFiter(selectOptions);

    setFilter((oldState) => ([
      ...oldState,
      `${selectOptions} ${condition} ${inputNum}`,
    ]));
    setData(result);
  };

  const filterNameData = () => {
    const dataFilter = dataInfo.filter((planet) => {
      const { name } = planet;

      const filteredName = name.toUpperCase().includes(inputName.toUpperCase());
      return filteredName;
    });
    setData(dataFilter);
  };

  if (error) return (<h1>Ocorreu um erro, tente recarregar a pagina</h1>);
  if (loading) return (<h1>Carregando...</h1>);

  return (
    <div>
      <Filters
        filterFunc={ filterNameData }
        filterNumFunc={ filterNumData }
        data={ data }
      />
      <p>
        { ` ${filters} ` }
      </p>
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
            data.map((planet) => (
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
