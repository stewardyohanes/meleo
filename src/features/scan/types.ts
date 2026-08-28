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

export const mealResponseSchema = z.object({
  id: z.string(),
  eatenAt: z.string(),
  overallScore: z.number(),
  classification: z.string(),
});

export type DetectedItem = z.infer<typeof detectedItemSchema>;
export type ScanResponse = z.infer<typeof scanResponseSchema>;
export type MealResponse = z.infer<typeof mealResponseSchema>;
export type ConfirmFood = { name: string; estimatedGrams: number; portionLabel: string };
