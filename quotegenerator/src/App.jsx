import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import Favourites from "./components/Favourites";
import "./App.css";

const backupQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
];

function App() {
  const [quote, setQuote] = useState(null);       
  const [loading, setLoading] = useState(false);  
  const [showFavourites, setShowFavourites] = useState(false);
  const [error, setError] = useState("");         
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  
  async function getQuote() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Server problem");

      const data = await response.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (err) {
      setError("Couldn't load from the internet. Showing a saved quote.");
      const randomIndex = Math.floor(Math.random() * backupQuotes.length);
      setQuote(backupQuotes[randomIndex]);
    }

    setLoading(false);
  }
  

  const isFavourite = quote
    ? favourites.some((fav) => fav.text === quote.text)
    : false;

  function toggleFavourite() {
    if (!quote) return;

    if (isFavourite) {
      removeFavourite(quote.text);
    } else {
      setFavourites([...favourites, quote]);
    }
  }

  function removeFavourite(text) {
    setFavourites(favourites.filter((fav) => fav.text !== text));
  }

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <main className="container">
      <button className="fav-toggle" onClick={() => setShowFavourites(true)}>
  ♥ Favourites ({favourites.length})
      </button>
      <h1>Quote Spark</h1>
      <p className="tagline">A little inspiration, one quote at a time.</p>
      <QuoteCard
        quote={quote}
        loading={loading}
        error={error}
        isFavourite={isFavourite}
        onNewQuote={getQuote}
        onToggleFavourite={toggleFavourite}
      />

      <Favourites
  favourites={favourites}
  onRemove={removeFavourite}
  isOpen={showFavourites}
  onClose={() => setShowFavourites(false)}
/>
    </main>
  );
}

export default App;