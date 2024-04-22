import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
      fetch(url).then((res) => {
        if (!res.ok) {
            throw Error('Error fetching repositories');
        }
        return res.json()
    }).then(data => {
        setData(data);
        setError(null);
    }).catch(err => {
        setError(err.message)
    })
  }, [url]);
    
    return { data, error };
};

export default useFetch;