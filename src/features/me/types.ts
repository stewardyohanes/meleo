import { z } from "zod";

export const preferencesSchema = z.object({
  goal: z.string().optional(),
  diet: z.string().optional(),
  timezone: z.string().optional(),
});

export const meResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  preferences: preferencesSchema,
});

export type Preferences = z.infer<typeof preferencesSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
