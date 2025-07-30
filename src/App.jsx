import { useState } from "react";
import Gallery from "./components/Gallery/Gallery";
import FavouritesPopUp from "./components/FavouritesPopUp/FavouritesPopUp";

function App() {
  const [popUp, setPopUp] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const handleOpenPopUp = () => {
    const stored = JSON.parse(localStorage.getItem("likedPhotos")) || [];
    setFavourites(stored);
    setPopUp(true);
  };

  return (
    <>
      {popUp && (
        <FavouritesPopUp
          favourites={favourites}
          onClose={() => setPopUp(false)}
        />
      )}
      <Gallery handleOpenPopUp={handleOpenPopUp} />
    </>
  );
}

export default App;
