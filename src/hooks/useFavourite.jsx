import { useState, useEffect } from "react";

export default function useFavourite(photo, favouritesList = null) {
  const [isFavourited, setIsFavourited] = useState(false);

  function getStoredPhotos() {
    return JSON.parse(localStorage.getItem("likedPhotos")) || [];
  }

  useEffect(() => {
    const stored = favouritesList || getStoredPhotos();
    const isLiked = stored.some((item) => item.id === photo.id);
    setIsFavourited(isLiked);
  }, [photo.id, favouritesList]);

  function handleFav() {
    const stored = getStoredPhotos();
    let updated;

    const isLiked = stored.some((item) => item.id === photo.id);

    if (isLiked) {
      updated = stored.filter((item) => item.id !== photo.id);
      setIsFavourited(false);
    } else {
      updated = [...stored, photo];
      setIsFavourited(true);
    }

    localStorage.setItem("likedPhotos", JSON.stringify(updated));
  }

  return { isFavourited, handleFav };
}
