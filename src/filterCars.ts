import type { CarSuggestion } from "./types";

export function filterCars(query: string, cars: CarSuggestion[]): CarSuggestion[] {
  const text = query.toLowerCase();
  let results = [...cars];

  // Βρες αριθμούς στο κείμενο (π.χ. "100")
  const numbers = text.match(/\d+/g)?.map(Number) ?? [];

  // "κάτω από X άλογα"
  if (text.includes("κατω") && text.includes("αλογα") && numbers.length > 0) {
    results = results.filter(car => car.horsepower < numbers[0]);
  }

  // "πάνω από X άλογα" / "γρήγορο"
  if (text.includes("πανω") && text.includes("αλογα") && numbers.length > 0) {
    results = results.filter(car => car.horsepower > numbers[0]);
  }
  if (text.includes("γρηγορο")) {
    results = results.filter(car => car.horsepower > 250);
  }
  if (text.includes("αργο")) {
    results = results.filter(car => car.horsepower < 150);
  }

  // Μάρκα (π.χ. "bmw")
  // Μάρκα (π.χ. "bmw") — φιλτράρει ΜΟΝΟ αν ο χρήστης ανέφερε κάποια μάρκα
const mentionedBrand = cars.find(car => text.includes(car.make.toLowerCase()));
if (mentionedBrand) {
  results = results.filter(car => car.make === mentionedBrand.make);
}

  return results;
}