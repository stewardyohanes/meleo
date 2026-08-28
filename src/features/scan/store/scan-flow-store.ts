import { create } from "zustand";
import type { DetectedItem, MealResponse } from "../types";

type ScanFlowState = {
  scanId: string | null;
  detectedItems: DetectedItem[];
  mealResult: MealResponse | null;
  setScan: (scanId: string, detectedItems: DetectedItem[]) => void;
  setMealResult: (meal: MealResponse) => void;
  reset: () => void;
};

export const useScanFlowStore = create<ScanFlowState>((set) => ({
  scanId: null,
  detectedItems: [],
  mealResult: null,
  setScan: (scanId, detectedItems) => set({ scanId, detectedItems }),
  setMealResult: (mealResult) => set({ mealResult }),
  reset: () => set({ scanId: null, detectedItems: [], mealResult: null }),
}));
