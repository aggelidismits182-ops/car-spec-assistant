# Car Spec Assistant

Μια React εφαρμογή όπου περιγράφεις τι ψάχνεις σε ένα αυτοκίνητο και παίρνεις προτάσεις μοντέλων με αιτιολόγηση.

## Εκκίνηση

```bash
npm install
npm run dev
```

Θα ανοίξει σε `http://localhost:5173`.

## Τι υπάρχει ήδη (Stage 1)

- `src/App.tsx` — input πεδίο + state για `input`, `loading`, `results`, `error`
- `src/CarCard.tsx` — component που κάνει render μία πρόταση (εικόνα, τιμή, specs, αιτιολόγηση)
- `src/mockData.ts` — 3 mock προτάσεις, ίδιο shape με ό,τι θα επιστρέφει αργότερα το AI
- `src/types.ts` — το `CarSuggestion` interface, το "συμβόλαιο" μεταξύ mock data / AI response / UI
- `src/index.css` — dark theme με κόκκινες (AMG-style) λεπτομέρειες

Πάτησε "Βρες μου αυτοκίνητο" — θα δεις loading state (~900ms fake delay) και μετά τα 3 mock αποτελέσματα.

## Επόμενα βήματα (roadmap)

1. **Static UI με mock data** ✅ (αυτό είναι το skeleton που έχεις τώρα)
2. **Σύνδεση με πραγματικό AI call** — αντικατέστησε το block στο `handleSubmit` (βλ. σχόλιο "STAGE 2" μέσα στο `App.tsx`) με πραγματικό `fetch` προς backend/serverless function που καλεί το Anthropic API με το prompt του χρήστη και ζητάει structured JSON output (λίστα από `CarSuggestion`). Καλό είναι το API key να μένει server-side (π.χ. Netlify Function), όχι στο frontend.
3. **Φίλτρα** — πρόσθεσε state για τιμή/τύπο αμαξώματος/brand και κάνε filter το `results` πριν το render, ή στείλε τα φίλτρα μαζί με το prompt στο AI.
4. **Favorites** — array από ids στο local state (ή `localStorage`... πρόσεξε: αν το κάνεις artifact μέσα στο claude.ai δεν υποστηρίζεται localStorage, αλλά εδώ τρέχει σαν κανονικό React app οπότε είναι μια χαρά).
5. **Deploy στο Netlify.**

## Δομή αρχείων

```
car-spec-assistant/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── CarCard.tsx
    ├── mockData.ts
    ├── types.ts
    └── index.css
```
