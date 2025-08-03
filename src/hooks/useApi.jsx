import { useState, useEffect } from "react";

export default function useApi(page, query) {
  const apiKey = import.meta.env.VITE_PEXELS_API;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const endpoint = query
        ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            query
          )}&per_page=16&page=${page}`
        : `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const result = await response.json();

        setData((prev) => {
          const newPhotos = result.photos.filter((newPhoto) => {
            return !prev.some(
              (existingPhoto) => existingPhoto.id === newPhoto.id
            );
          });
          return [...prev, ...newPhotos];
        });
      } catch (e) {
        console.error("API fetch error:", e);
        setError(`Error loading images: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, query, apiKey]);

  return { data, isLoading, error };
}
