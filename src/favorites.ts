import { supabase } from "./supabase";
import type { CarSuggestion } from "./types";

// Προσθήκη αγαπημένου
export async function addFavorite(car: CarSuggestion) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Δεν είσαι συνδεδεμένος");

  const { error } = await supabase.from("favorites").insert({
    user_id: userData.user.id,
    car_data: car,
  });
  if (error) throw error;
}

// Αφαίρεση αγαπημένου (με βάση το id της γραμμής στη βάση)
export async function removeFavorite(favoriteId: number) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", favoriteId);
  if (error) throw error;
}

// Φέρε όλα τα αγαπημένα του χρήστη
export interface FavoriteRow {
  id: number;
  car_data: CarSuggestion;
}

export async function getFavorites(): Promise<FavoriteRow[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("id, car_data")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as FavoriteRow[];
}