import { api } from "@/lib/api-client";
import { File } from "expo-file-system";
import { mealResponseSchema, scanResponseSchema, type ConfirmFood } from "../types";

export const scanService = {
  uploadImage: (fileUri: string) => {
    // RN's New Architecture FormData no longer accepts the old {uri,name,type}
    // duck-typed part — expo-file-system's File implements Blob directly.
    const form = new FormData();
    form.append("image", new File(fileUri), "meal.jpg");
    return api.post<{ path: string }>("/uploads/meal-image", form);
  },
  create: async (imagePath: string) =>
    scanResponseSchema.parse(await api.post("/scans", { imagePath })),
  get: async (id: string) => scanResponseSchema.parse(await api.get(`/scans/${id}`)),
  retry: async (id: string) => scanResponseSchema.parse(await api.post(`/scans/${id}/retry`)),
  confirm: async (id: string, foods: ConfirmFood[], eatenAt?: string) =>
    mealResponseSchema.parse(await api.post(`/scans/${id}/confirm`, { foods, eatenAt })),
};
