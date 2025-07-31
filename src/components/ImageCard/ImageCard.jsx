import "./ImageCard.css";
import useFavourite from "../../hooks/useFavourite";

export default function ImageCard({
  photo,
  hideFavouriteButton = false,
  onRemove,
  favouritesList,
}) {
  const { isFavourited, handleFav } = useFavourite(photo, favouritesList);
  return (
    <>
      <div className="image-card">
        <img src={photo.src.large2x} alt={photo.alt} loading="lazy" />
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-text">
              <p className="photo-alt">{photo.alt}</p>
              <hr />
              <p className="photo-photographer">{photo.photographer}</p>
            </div>
            <div className="button-wrapper">
              {!hideFavouriteButton ? (
                <button
                  className={isFavourited ? "fav-btn-active" : "fav-btn"}
                  onClick={handleFav}
                >
                  {isFavourited ? "Favourited" : "Favourite"}
                </button>
              ) : onRemove ? (
                <button className="remove-btn" onClick={onRemove}>
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
