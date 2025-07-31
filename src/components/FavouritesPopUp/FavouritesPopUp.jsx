import { createPortal } from "react-dom";
import ImageCard from "../ImageCard/ImageCard.jsx";
import "./FavouritesPopUp.css";

export default function FavouritesPopUp({
  favourites,
  setFavourites,
  onClose,
}) {
  const handleRemove = (id) => {
    const updated = favourites.filter((photo) => photo.id !== id);
    setFavourites(updated);

    localStorage.setItem("likedPhotos", JSON.stringify(updated));
  };

  return createPortal(
    <div className="popup-backdrop" onClick={onClose}>
      <div
        className="pop-up-window"
        onClick={(e) => e.stopPropagation()}
        aria-label="Favourites gallery"
        title="Favourites"
      >
        <div className="btn-wrapper">
          <button
            className="close-button"
            onClick={onClose}
            aria-label="close"
            title="Close"
          >
            X
          </button>
        </div>
        <div className="popup-grid">
          {favourites.length === 0 ? (
            <p>No favourites yet</p>
          ) : (
            favourites.map((photo) => (
              <ImageCard
                key={photo.id}
                photo={photo}
                hideFavouriteButton
                onRemove={() => handleRemove(photo.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
