import { z } from "zod";

export const detectedItemSchema = z.object({
  name: z.string(),
  estimatedGrams: z.number(),
  portionLabel: z.string(),
  confidence: z.number(),
});

export const scanResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  errorMessage: z.string().optional(),
  detectedItems: z.array(detectedItemSchema).optional(),
});

// Each component is a 0-100 sub-score (higher is always better, regardless
// of nutrient direction — e.g. lower sodium yields a higher sodium score).
// Absent when that nutrient couldn't be resolved for the meal.
export const componentScoresSchema = z.object({
  protein: z.number().optional(),
  fiber: z.number().optional(),
  fruitVeg: z.number().optional(),
  sugar: z.number().optional(),
  sodium: z.number().optional(),
  satFat: z.number().optional(),
});

// Raw aggregated macros behind the score.
export const nutritionTotalsSchema = z.object({
  caloriesKcal: z.number().optional(),
  proteinG: z.number().optional(),
  fiberG: z.number().optional(),
  fruitVegG: z.number().optional(),
  totalSugarG: z.number().optional(),
  addedSugarG: z.number().optional(),
  sodiumMg: z.number().optional(),
  saturatedFatG: z.number().optional(),
  carbsG: z.number().optional(),
  totalFatG: z.number().optional(),
});

export const mealResponseSchema = z.object({
  id: z.string(),
  eatenAt: z.string(),
  overallScore: z.number(),
  classification: z.string(),
  components: componentScoresSchema,
  nutrition: nutritionTotalsSchema,
});

export type DetectedItem = z.infer<typeof detectedItemSchema>;
export type ScanResponse = z.infer<typeof scanResponseSchema>;
export type ComponentScores = z.infer<typeof componentScoresSchema>;
export type NutritionTotals = z.infer<typeof nutritionTotalsSchema>;
export type MealResponse = z.infer<typeof mealResponseSchema>;
export type ConfirmFood = { name: string; estimatedGrams: number; portionLabel: string };
