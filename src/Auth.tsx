import { useState, FormEvent } from "react";
import { supabase } from "./supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(
        error
          ? "Σφάλμα: " + error.message
          : "Έλεγξε το email σου για επιβεβαίωση!"
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage("Σφάλμα: " + error.message);
      // Αν πετύχει, το App θα το καταλάβει μόνο του (θα δεις στο βήμα 2.6)
    }

    setLoading(false);
  }

  return (
    <div className="auth">
      <h2>{isSignUp ? "Δημιουργία λογαριασμού" : "Σύνδεση"}</h2>

      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Κωδικός (τουλάχιστον 6 χαρακτήρες)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Περίμενε..." : isSignUp ? "Εγγραφή" : "Σύνδεση"}
        </button>
      </form>

      {message && <p className="auth__message">{message}</p>}

      <button
        type="button"
        className="auth__toggle"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setMessage(null);
        }}
      >
        {isSignUp
          ? "Έχεις ήδη λογαριασμό; Σύνδεση"
          : "Δεν έχεις λογαριασμό; Εγγραφή"}
      </button>
    </div>
  );
}