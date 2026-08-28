import { componentScoresSchema, nutritionTotalsSchema } from "@/features/scan/types";
import { z } from "zod";

export const mealListItemSchema = z.object({
  id: z.string(),
  eatenAt: z.string(),
});

export const mealFoodSchema = z.object({
  name: z.string(),
  estimatedGrams: z.number(),
  portionLabel: z.string().optional(),
});

export const mealDetailSchema = z.object({
  id: z.string(),
  eatenAt: z.string(),
  foods: z.array(mealFoodSchema),
  overallScore: z.number().optional(),
  classification: z.string().optional(),
  components: componentScoresSchema.optional(),
  nutrition: nutritionTotalsSchema.optional(),
});

export type MealListItem = z.infer<typeof mealListItemSchema>;
export type MealFood = z.infer<typeof mealFoodSchema>;
export type MealDetail = z.infer<typeof mealDetailSchema>;
