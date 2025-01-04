import { useState } from "react";

export const useKhaos = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const invoke = async (url: string) => {
    setLoading(true);

    const response = await fetch(url);
    const payload = await response.json();

    if (response.ok) {
      console.log("=== data:");
      console.log(payload);
      setData("there is data :D");
    } else {
      console.log("=== error:");
      console.log(payload);
      setError("there is error D:");
    };

    setLoading(false)
  };

  return Object.freeze({ data, loading, error, invoke });
};