import { useState, FormEvent } from "react";
import CarCard from "./CarCard";
import { MOCK_SUGGESTIONS } from "./mockData";
import type { CarSuggestion } from "./types";
import { filterCars } from "./filterCars";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CarSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // --- STAGE 1 (now): mock data, just to prove the UI/state flow works.
      // Fake a network delay so the loading state is actually visible.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setResults(filterCars(input, MOCK_SUGGESTIONS));

      // --- STAGE 2 (next): swap the block above for a real call, e.g.
      //
      // const res = await fetch("/api/suggest", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ prompt: input }),
      // });
      // if (!res.ok) throw new Error("Η κλήση στο AI απέτυχε.");
      // const data: CarSuggestion[] = await res.json();
      // setResults(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Κάτι πήγε στραβά. Δοκίμασε ξανά."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>
          Car Spec <span className="accent">Assistant</span>
        </h1>
        <p className="app__subtitle">
          Πες μας τι ψάχνεις σε ένα αυτοκίνητο και θα σου προτείνουμε μοντέλα.
        </p>
      </header>

      <form className="app__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="app__input"
          placeholder='π.χ. "θέλω κάτι σπορ, γρήγορο, κάτω από 60.000€"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="app__submit" disabled={loading}>
          {loading ? "Ψάχνω..." : "Βρες μου αυτοκίνητο"}
        </button>
      </form>

      {error && <p className="app__error">{error}</p>}

      {loading && (
        <div className="app__loading" role="status" aria-live="polite">
          <div className="spinner" />
          <span>Αναλύω τις προτιμήσεις σου...</span>
        </div>
      )}

      {!loading && results.length > 0 && (
        <section className="app__results">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </section>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="app__empty">
          Δεν υπάρχουν ακόμα προτάσεις — γράψε τι ψάχνεις παραπάνω.
        </p>
      )}
    </div>
  );
}
