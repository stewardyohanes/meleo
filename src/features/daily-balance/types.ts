import { z } from "zod";

export const dailyBalanceSchema = z.object({
  date: z.string(),
  overallScore: z.number(),
  classification: z.string(),
  mealCount: z.number(),
  recommendation: z
    .object({ component: z.string(), priority: z.number() })
    .optional(),
});

export const weeklyProgressSchema = z.object({
  weeklyScore: z.number().nullable(),
  trackedDays: z.number(),
  totalDays: z.number(),
});

export type DailyBalance = z.infer<typeof dailyBalanceSchema>;
export type WeeklyProgress = z.infer<typeof weeklyProgressSchema>;
