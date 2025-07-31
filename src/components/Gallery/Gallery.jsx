import { useState } from "react";
import useApi from "../../hooks/useApi";
import useScroll from "../../hooks/useScroll";
import ImageCard from "../ImageCard/ImageCard";
import NavBar from "../NavBar/NavBar";
import "./Gallery.css";

export default function Gallery({ handleOpenPopUp, favourites }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading, error } = useApi(page, query);

  useScroll(() => {
    if (!isLoading) setPage((prev) => prev + 1);
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    setPage(1);
  };

  return (
    <>
      <NavBar
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        handleOpenPopUp={handleOpenPopUp}
      />

      <div className="grid-container">
        {!isLoading && !error && data.length === 0 && (
          <p className="no-results">
            Oops! No results found. Try a different search term.
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
        {isLoading && (
          <p className="loading" aria-label="Loading images">
            Loading images ⏳
          </p>
        )}
        {data.map((photo) => (
          <ImageCard key={photo.id} photo={photo} favouritesList={favourites} />
        ))}
      </div>
    </>
  );
}
