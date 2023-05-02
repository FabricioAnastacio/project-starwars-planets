import { useState } from 'react';

///
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      setLoading(true);
      const API = await fetch(url);
      const resultAPI = await API.json();
      const result = resultAPI.results;
      result.map((obj) => delete obj.residents);
      setData(result);
      setLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  return [
    data,
    loading,
    error,
    refresh,
  ];
}
