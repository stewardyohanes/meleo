import { api } from "@/lib/api-client";
import { dailyBalanceSchema, weeklyProgressSchema } from "../types";

export const dailyBalanceService = {
  get: async (date: string) => dailyBalanceSchema.parse(await api.get(`/daily-balance/${date}`)),
  weekly: async () => weeklyProgressSchema.parse(await api.get("/progress/weekly")),
};
