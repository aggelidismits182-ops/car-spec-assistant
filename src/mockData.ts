import type { CarSuggestion } from "./types";

// Stage 1 placeholder data. In Stage 2 this gets replaced by the parsed
// JSON response from the AI call, using the exact same CarSuggestion shape.
export const MOCK_SUGGESTIONS: CarSuggestion[] = [
  {
    id: "1",
    make: "BMW",
    model: "M240i Coupe",
    year: 2024,
    priceEUR: 58900,
    bodyType: "Coupe",
    horsepower: 374,
    zeroToHundredSec: 4.3,
    imageUrl: "https://placehold.co/600x360/0a0a0a/e2001a?text=BMW+M240i",
    reason:
      "Συνδυάζει σπορ οδηγική εμπειρία, καλή ισχύ (374 hp) και τιμή κάτω από το budget σου, με ευέλικτο 6κύλινδρο κινητήρα.",
  },
  {
    id: "2",
    make: "Audi",
    model: "S3 Sportback",
    year: 2024,
    priceEUR: 52500,
    bodyType: "Hatchback",
    horsepower: 310,
    zeroToHundredSec: 4.8,
    imageUrl: "https://placehold.co/600x360/0a0a0a/e2001a?text=Audi+S3",
    reason:
      "Compact sport hatchback με quattro τετρακίνηση, ιδανικό για καθημερινή χρήση χωρίς να θυσιάζεις τις επιδόσεις.",
  },
  {
    id: "3",
    make: "Ford",
    model: "Mustang GT",
    year: 2023,
    priceEUR: 54900,
    bodyType: "Coupe",
    horsepower: 449,
    zeroToHundredSec: 4.5,
    imageUrl: "https://placehold.co/600x360/0a0a0a/e2001a?text=Mustang+GT",
    reason:
      "Καθαρόαιμο muscle car εμπειρία με V8 ήχο, δίνει τη μεγαλύτερη ισχύ της λίστας εντός budget.",
  },
];
