// Shape of a single car suggestion. This is the contract both the mock data
// (Stage 1) and the real AI response (Stage 2) will conform to, so swapping
// the data source later doesn't require touching CarCard.tsx at all.
export interface CarSuggestion {
  id: string;
  make: string;
  model: string;
  year: number;
  priceEUR: number;
  bodyType: "Coupe" | "Sedan" | "Hatchback" | "SUV" | "Convertible" | "Wagon";//eidos skeletou
  horsepower: number;//ippodynamh
  zeroToHundredSec: number;
  imageUrl: string;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";//eidos kausimou
  reason: string; // AI-generated (or mocked) explanation of why this fits the prompt
}
