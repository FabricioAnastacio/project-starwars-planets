import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

///
export default function useFetch(url) {
  const { setData } = useContext(AppContext);
  const [dataInfo, setInfoData] = useState([]);
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
      setInfoData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return [
    dataInfo,
    loading,
    error,
    refresh,
  ];
}
