import { useState, useEffect } from "react";
import { createClient } from "pexels";

export default function useApi(page, query) {
  const apiKey = "H7x3rkG5xV4QIRVsz5zIu115eAfK8IjqfELhvLJHU2J7E6KUbQ71Mguq";
  const client = createClient(apiKey);

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

      try {
        const response = query
          ? await client.photos.search({ query, per_page: 16, page })
          : await client.photos.curated({ per_page: 16, page });

        setData((prev) => {
          const newPhotos = response.photos.filter((newPhoto) => {
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
  }, [page, query]);

  return { data, isLoading, error };
}
