import axios from "axios";
import React, { useState } from "react";

type method = "GET" | "POST" | "PUT" | "DELETE";

export const useHttp = () => {
  const [response, setResponse] = useState<[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const callApi = async (url: string, method: method, data?: object) => {
    console.log(`url ${url}`);
    console.log(`method`, method);
    console.log(`data`, data);
    try {
      setLoading(true);
      const resp: any = await axios({
        url,
        method: method,
        data,
      });
      setResponse(resp);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { response, loading, error, callApi };
};
