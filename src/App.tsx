import { useState, FormEvent, useEffect  } from "react";
import CarCard from "./CarCard";
import type { CarSuggestion } from "./types";
import { supabase } from "./supabase";
import Auth from "./Auth";
import type { Session } from "@supabase/supabase-js";
import { addFavorite, removeFavorite, getFavorites } from "./favorites";
import type { FavoriteRow } from "./favorites";

const BRANDS = [
  { name: "BMW", slug: "bmw" },
  { name: "Mercedes", slug: "mercedes-benz" },
  { name: "Audi", slug: "audi" },
  { name: "Toyota", slug: "toyota" },
  { name: "VW", slug: "volkswagen" },
  { name: "Porsche", slug: "porsche" },
  { name: "Tesla", slug: "tesla" },
  { name: "Ford", slug: "ford" },
];

function brandLogo(slug: string): string {
  return `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/${slug}.png`;
}
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => setSession(data.session));


  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session)
  );

  return () => listener.subscription.unsubscribe();
}, []);
useEffect(() => {
    if (session) {
      getFavorites().then(setFavorites).catch(console.error);
    } else {
      setFavorites([]);
    }
  }, [session]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CarSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteRow[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // --- STAGE 1 (now): mock data, just to prove the UI/state flow works.
      // Fake a network delay so the loading state is actually visible.
      // await new Promise((resolve) => setTimeout(resolve, 900));
      //setResults(filterCars(input, MOCK_SUGGESTIONS));

      // --- STAGE 2 (next): swap the block above for a real call, e.g.
      //
      const res = await fetch("/api/suggest", {
      method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ prompt: input }),
       });
       if (!res.ok) throw new Error("Η κλήση στο AI απέτυχε.");
       const data: CarSuggestion[] = await res.json();
       setResults(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Κάτι πήγε στραβά. Δοκίμασε ξανά."
      );
    } finally {
      setLoading(false);
    }
  }
async function handleToggleFavorite(car: CarSuggestion) {
    const existing = favorites.find((f) => f.car_data.id === car.id);
    try {
      if (existing) {
        await removeFavorite(existing.id);
        setFavorites(favorites.filter((f) => f.id !== existing.id));
      } else {
        await addFavorite(car);
        const fresh = await getFavorites();
        setFavorites(fresh);
      }
    } catch (err) {
      console.error("Σφάλμα στα αγαπημένα:", err);
    }
  }


  if (!session) {
    return (
      <div className="app">
        <header className="app__header">
          <img src="/logo.svg" alt="Car Spec Assistant logo" className="app__logo" />
          <h1>
            Car Spec <span className="accent">Assistant</span>
          </h1>
        </header>
        <Auth />
      </div>
    );
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
      <div className="brand-bar">
          {BRANDS.map((b) => (
            <button
              key={b.slug}
              type="button"
              className="brand-chip"
              onClick={() => setInput(`θέλω ένα ${b.name}`)}
            >
              <img src={brandLogo(b.slug)} alt={b.name} />
              <span>{b.name}</span>
            </button>
          ))}
        </div>

      {error && <p className="app__error">{error}</p>}

      {loading && (
        <div className="app__loading" role="status" aria-live="polite">
          <div className="spinner" />
          <span>Αναλύω τις προτιμήσεις σου...</span>
        </div>
      )}

      {!loading && results.length > 0 && (
        <section className="app__results">
          {results.map((car, i) => (
  <div
    key={car.id}
    className="card-wrap"
    style={{ animationDelay: `${i * 0.08}s` }}
  >
    <CarCard
  car={car}
  isFavorite={favorites.some((f) => f.car_data.id === car.id)}
  onToggleFavorite={handleToggleFavorite}
/>
  </div>
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
