import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './orderData.css';

//
export default function OrderData() {
  const { data, setData } = useContext(AppContext);

  const [order, setOrder] = useState({
    order: {
      column: 'population',
      sort: '',
    },
  });

  const configOrder = ({ target }) => {
    const { value, name } = target;

    setOrder((oldOrder) => ({
      order: {
        ...oldOrder.order,
        [name]: value,
      },
    }));
  };

  const clickedOrder = () => {
    const { order: { column, sort } } = order;

    data.sort((a, b) => Number(b[column]) - Number(a[column]));

    if (sort === 'ASC') {
      data.sort((a, b) => Number(a[column]) - Number(b[column]));
    }

    setData([...data]);
  };

  return (
    <div className="header_order">
      <select
        data-testid="column-sort"
        name="column"
        value={ order.order.column }
        onChange={ configOrder }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <input
        data-testid="column-sort-input-asc"
        name="sort"
        type="radio"
        value="ASC"
        onChange={ configOrder }
      />
      Ascendente
      <input
        data-testid="column-sort-input-desc"
        name="sort"
        type="radio"
        value="DESC"
        onChange={ configOrder }
      />
      Descendente
      <button
        data-testid="column-sort-button"
        onClick={ clickedOrder }
      >
        Ordenar
      </button>
    </div>
  );
}
