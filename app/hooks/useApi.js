import { useState } from "react";

export default useApi = (apiFunc, ...args) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const request = async () => {
    setError(false);

    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      console.log("Hit API error", response.problem, "when call", apiFunc);
      return setError(true);
    }
    return setData(response.data);
  };
  return { data, error, loading, request };
};
