function Favourites({ favourites, onRemove, isOpen, onClose }) {
  return (
    <>
      {/* Dark background behind the panel. Click it to close. */}
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      {/* The sliding panel */}
      <aside className={`favourites-panel ${isOpen ? "open" : ""}`}>
        <div className="panel-header">
          <h2>Favourites</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {favourites.length === 0 ? (
          <p className="empty">No favourites yet.</p>
        ) : (
          <ul>
            {favourites.map((fav) => (
              <li key={fav.text}>
                <span>
                  "{fav.text}" — {fav.author}
                </span>
                <button onClick={() => onRemove(fav.text)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}

export default Favourites;