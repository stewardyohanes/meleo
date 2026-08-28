import { api } from "@/lib/api-client";
import { meResponseSchema, preferencesSchema, type Preferences } from "../types";

export const meService = {
  get: async () => meResponseSchema.parse(await api.get("/me")),
  updatePreferences: async (prefs: Preferences) =>
    preferencesSchema.parse(await api.patch("/me/preferences", prefs)),
  deleteAccount: () => api.delete<void>("/me"),
};
