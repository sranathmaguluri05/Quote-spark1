import { useState } from "react";

function QuoteCard({ quote, loading, error, isFavourite, onNewQuote, onToggleFavourite }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!quote) return;

    const text = `"${quote.text}" — ${quote.author}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); 
    } catch (err) {
      alert("Couldn't copy. Please try again.");
    }
  }

  return (
    <section className="card">
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {quote && (
        <>
          <blockquote>"{quote.text}"</blockquote>
          <p className="author">— {quote.author}</p>
        </>
      )}

      <div className="buttons">
        <button onClick={onNewQuote} disabled={loading}>
          New Quote
        </button>

        <button onClick={handleCopy} disabled={!quote}>
          {copied ? "Copied!" : "Copy"}
        </button>

        <button onClick={onToggleFavourite} disabled={!quote}>
          {isFavourite ? "♥ Remove from Favourites" : "♡ Add to Favourites"}
        </button>
      </div>
    </section>
  );
}

export default QuoteCard;