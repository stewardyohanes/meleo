import { create } from "zustand";

export type Goal = "balanced" | "protein" | "fiber" | "veggies" | "sugar";
export type Diet =
  | "No preference"
  | "Vegetarian"
  | "Vegan"
  | "Pescatarian"
  | "Halal";

export const GOAL_LABELS: Record<Goal, string> = {
  balanced: "Eat More Balanced",
  protein: "Get More Protein",
  fiber: "Eat More Fiber",
  veggies: "Eat More Vegetables",
  sugar: "Reduce Added Sugar",
};

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
