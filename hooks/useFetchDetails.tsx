"use client";

import axiosClient from "@/lib/axiosClient";
import { useEffect, useState } from "react";

const useFetchDetails = (endpoint: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Remove leading slash if present
      const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint.slice(1)
        : endpoint;
      const response = await axiosClient.get(cleanEndpoint);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchDetails;
