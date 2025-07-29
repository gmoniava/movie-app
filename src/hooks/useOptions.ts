import { useEffect, useState } from "react";

export type Option = {
  value: number;
  label: string;
};

export function useOptions(name: string) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch(`/api/${name}`);
        if (!res.ok) throw new Error("Failed to fetch options");

        const data = await res.json();
        setOptions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []); //eslint-disable-line

  return { options, loading, error };
}
