import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mealsService } from "../services/meals.service";

export const mealsKeys = {
  list: (limit: number, offset: number) => ["meals", limit, offset] as const,
  detail: (id: string) => ["meals", id] as const,
};

export function useMeals(limit = 20, offset = 0) {
  return useQuery({
    queryKey: mealsKeys.list(limit, offset),
    queryFn: () => mealsService.list(limit, offset),
  });
}

export function useMealDetail(id: string | undefined) {
  return useQuery({
    queryKey: mealsKeys.detail(id ?? ""),
    queryFn: () => mealsService.get(id as string),
    enabled: !!id,
  });
}

export function useDeleteMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mealsService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meals"] }),
  });
}
