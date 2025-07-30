import ".//NavBar.css";

export default function NavBar({
  inputValue,
  onInputChange,
  onSubmit,
  handleOpenPopUp,
}) {
  return (
    <nav className="navbar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="Search"
          onChange={onInputChange}
          aria-label="Search photos"
        />
        <button type="submit" aria-label="Search" title="Search">
          🔍
        </button>
        <button
          type="button"
          aria-label="Favourites"
          title="Favourites"
          onClick={handleOpenPopUp}
        >
          ❤️
        </button>
      </form>
    </nav>
  );
}
