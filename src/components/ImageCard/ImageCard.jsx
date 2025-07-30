import "./ImageCard.css";
import useFavourite from "../../hooks/useFavourite";

export default function ImageCard({ photo }) {
  const { isFavourited, handleFav } = useFavourite(photo);
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
              <button
                className={isFavourited ? "fav-btn-active" : "fav-btn"}
                onClick={handleFav}
              >
                {isFavourited ? "Favourited" : "Favourite"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
