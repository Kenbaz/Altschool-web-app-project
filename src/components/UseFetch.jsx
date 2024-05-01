import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching repositories");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [url]);

  return { data, error, isLoading };
}

export default useFetch;
