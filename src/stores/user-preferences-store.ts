import { create } from "zustand";

export type Goal = "balanced" | "protein" | "fiber" | "veggies" | "sugar";
export type Diet =
  | "No preference"
  | "Vegetarian"
  | "Vegan"
  | "Pescatarian"
  | "Halal";

interface UserPreferencesState {
  goal: Goal;
  diet: Diet;
  setGoal: (goal: Goal) => void;
  setDiet: (diet: Diet) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>((set) => ({
  goal: "balanced",
  diet: "No preference",
  setGoal: (goal: Goal) => set({ goal }),
  setDiet: (diet: Diet) => set({ diet }),
}));
