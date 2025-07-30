import { createPortal } from "react-dom";
import "./FavouritesPopUp.css";

export default function FavouritesPopUp({ favourites, onClose }) {
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
              <img
                key={photo.id}
                src={photo.src.large}
                alt={photo.alt}
                className="popup-image"
                loading="lazy"
              />
            ))
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
