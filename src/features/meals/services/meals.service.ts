import { api } from "@/lib/api-client";
import { mealDetailSchema, mealListItemSchema } from "../types";
import { z } from "zod";

export const mealsService = {
  list: async (limit = 20, offset = 0) =>
    z.array(mealListItemSchema).parse(await api.get(`/meals?limit=${limit}&offset=${offset}`)),
  get: async (id: string) => mealDetailSchema.parse(await api.get(`/meals/${id}`)),
  update: async (id: string, eatenAt: string) =>
    mealListItemSchema.parse(await api.patch(`/meals/${id}`, { eatenAt })),
  remove: (id: string) => api.delete<void>(`/meals/${id}`),
};
