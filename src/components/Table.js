import { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFecth';
import './table.css';
import { AppContext } from '../context/AppContext';
import Filters from './Filters';
import OrderData from './OrderData';
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

  function removeOptionFiter(param) {
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

    removeOptionFiter(selectOptions);

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

  function verficNewData(newList) {
    if (newList.length === 0) return [dataInfo];

    const DATA = newList.map((filter) => {
      const coditionsFilter = filter.split(' ');
      const numInFilter = coditionsFilter[coditionsFilter.length - 1];
      const filterIsAdd = coditionsFilter[0];

      const newDATA = dataInfo.filter((planet) => {
        if (coditionsFilter[1] === 'maior') {
          return Number(planet[filterIsAdd]) > Number(numInFilter);
        }
        if (coditionsFilter[1] === 'menor') {
          return Number(planet[filterIsAdd]) < Number(numInFilter);
        }
        return Number(planet[filterIsAdd]) === Number(numInFilter);
      });
      return newDATA;
    });
    return DATA;
  }

  const dellFilter = (filter) => {
    const coditionsFilter = filter.split(' ');
    const filterIsAdd = coditionsFilter[0];
    const addOptionFilters = [...optionsFilter, filterIsAdd];

    const newListFiters = filters.filter((rmFilter) => rmFilter !== filter);

    setData(...verficNewData(newListFiters));
    setFilter(newListFiters);
    setOption(addOptionFilters);
  };

  const dellAllFiters = () => {
    setData(dataInfo);
    setFilter([]);
    setOption([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  if (loading) return (<h1>Carregando...</h1>);
  if (error) return (<h1>Ocorreu um erro, tente recarregar a pagina</h1>);

  return (
    <div>
      <Filters
        filterFunc={ filterNameData }
        filterNumFunc={ filterNumData }
        data={ data }
        dellAllFiters={ dellAllFiters }
      />
      <OrderData />
      {
        filters.map((filter, index) => (
          <p
            data-testid="filter"
            className="textDellButton"
            key={ index }
          >
            { filter }
            {' '}
            <button
              className="dellButton"
              key={ index }
              onClick={ () => dellFilter(filter) }
            >
              X
            </button>
          </p>
        ))
      }
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
                <td data-testid="planet-name">{ planet.name }</td>
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
